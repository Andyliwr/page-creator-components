/* eslint-disable no-eval */
import React from 'react'
import PropTypes from 'prop-types'

const evalCode = eval

const Base = BaseComponent => {
  return class extends React.Component {
    static defaultProps = {
      methods: {},
      events: []
    }

    static propTypes = {
      methods: PropTypes.object,
      events: PropTypes.array,
      compid: PropTypes.string
    }

    // 处理app传过来的事件
    componentDidMount() {
      const { events = [], compid } = this.props
      events.forEach(item => {
        // const methodName = this.transMethodName(item.event_type)
        const methodBody = this.transMethodBody(item.condition, item.event_detail)
        this.live(document, `#${compid}${item.event_element ? ` *[data-name="${item.event_element}"]` : ''}`, item.event_type, methodBody)
      })
    }

    // 比较函数：判断事件的作用目标是否与选择器匹配；匹配则返回true
    matchSelector = (element, selector) => {
      // 如果选择器为ID
      if (selector.charAt(0) === '#') {
        return element.id === selector.slice(1)
      }
      // 如果选择器为Class
      if (selector.charAt(0) === '.') {
        return (' ' + element.className + ' ').indexOf(' ' + selector.slice(1) + ' ') !== -1
      }
      // 如果选择器为tagName
      return element.tagName.toLowerCase() === selector.toLowerCase()
    }

    // 事件委托封装
    live = (parent, selector, type, fn) => {
      const eventFn = event => {
        const thisEvent = event || window.event
        const target = event.target || event.srcElement
        // 如果目标元素与选择器匹配则执行函数
        if (this.matchSelector(target, selector)) {
          if (fn) {
            // 将fn内部的this指向target
            fn.call(target, thisEvent)
          }
        }
      }

      if (parent.addEventListener) {
        parent.addEventListener(type, eventFn)
      } else {
        parent.attachEvent('on' + type, eventFn)
      }
    }

    // 转换事件名称
    transMethodName = method => {
      let result = ''
      switch (method) {
        case 'click':
          result = 'onClick'
          break
        default:
          break
      }
      return result
    }

    // 转化事件代码
    transMethodBody = (condition, detail) => {
      if (!condition || condition === 'none') {
        // 立即执行事件
        return this.transMethodDetail(detail.none)
      } else {
        // 条件执行事件
        const success = this.transMethodDetail(detail.true)
        const fail = this.transMethodDetail(detail.true)
        const conditionFn = evalCode(unescape(condition))
        if (typeof conditionFn === 'function') return () => { conditionFn(success, fail) }
      }
    }

    transMethodDetail = detail => {
      const { methods } = this.props
      if (!detail) {
        return null
      }
      const { type } = detail
      let func = null
      let callback = null
      switch (type) {
        // 超链接
        case 'link':
          func = () => {
            window.location.href = detail.link_url
          }
          break
        // 协议
        case 'protocal':
          func = () => {
            evalCode(unescape(detail.protocal_codes))
          }
          break
        // 图片弹窗
        case 'img_dialog':
          if (detail.img_dialog_jump_type === 'link') {
            callback = () => {
              window.location.href = detail.img_dialog_jump_url
            }
          } else if (detail.img_dialog_jump_type === 'protocal') {
            callback = () => {
              evalCode(unescape(detail.img_dialog_jump_codes))
            }
          }
          func = () => {
            methods.openImgDialog({
              show: true,
              img: detail.img_dialog_img_url,
              callback
            })
          }
          break
        // 问题弹窗
        case 'text_dialog':
          if (detail.text_dialog_jump_type === 'link') {
            callback = () => {
              window.location.href = detail.text_dialog_jump_url
            }
          } else if (detail.text_dialog_jump_type === 'protocal') {
            callback = () => {
              evalCode(unescape(detail.text_dialog_jump_codes))
            }
          }
          func = () => {
            methods.openTextDialog({
              title: detail.text_dialog_title,
              content: detail.text_dialog_content,
              cancel_text: detail.text_dialog_cancel_text,
              confirm_text: detail.text_dialog_confirm_text,
              callback
            })
          }
          break
        // 客服按钮
        case 'customer_service':
          if (detail.customer_service_type === 'kefu') {
            func = () => {
              window.location.href = `tel:${detail.customer_service_value}`
            }
          } else if (detail.customer_service_type === 'QQ') {
            func = () => {
              window.location.href = `mqqwpa://im/chat?chat_type=wpa&uin=${detail.customer_service_value}&version=1&src_type=web&web_src=oicqzone.com`
            }
          }
          break
        // 锚点
        case 'anchor_point':
          func = () => {
            window.location.hash = `#${detail.anchor_point_value}`
          }
          break
        // 自定义代码
        case 'custom_event':
          func = () => {
            evalCode(unescape(detail.custom_event_code))
          }
          break
        default:
          break
      }
      return func
    }

    render() {
      return <BaseComponent {...this.props} />
    }
  }
}

export default Base
