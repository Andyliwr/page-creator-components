/*
 * @Description: 客服咨询组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-04-08 16:38:56
 * @LastEditTime: 2019-05-07 17:48:21
 */
import React from 'react'
import Base from '../../Base'

import styles from './index.less'

export default Base(
  class CustomServicePreview extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = { height: 40 }
      this.clickTelBtnFn = this.clickTelBtnFn.bind(this)
      this.clickQQBtnFn = this.clickQQBtnFn.bind(this)
      this.refCallBackFn = this.refCallBackFn.bind(this)
    }
    mainDom = null

    clickTelBtnFn() {
      const { telephone } = this.props
      if (telephone) window.location.href = `tel: ${telephone}`
    }
    clickQQBtnFn() {
      const { qq } = this.props
      if (qq) window.open(`tencent://message/?uin=${qq}`)
    }

    getBtnListFn() {
      let { radius, serviceType, color, fontSize, background } = this.props
      let { height } = this.state
      if (this.mainDom) height = this.mainDom.clientHeight

      const { length } = serviceType
      fontSize = (fontSize || '24px').replace('px', '')
      fontSize = fontSize / 2 + 'px'
      let btnStyles = {
        tel: { color, fontSize },
        qq: { color, fontSize }
      }

      let boxStyle = {
        tel: { background },
        qq: { background }
      }
      if (length === 2) {
        boxStyle.tel.marginRight = '7.5px'
        boxStyle.qq.marginLeft = '7.5px'
      }
      if (radius === 'circle') {
        if (height) {
          boxStyle.tel.borderRadius = `${height / 2}px`
          boxStyle.qq.borderRadius = `${height / 2}px`
        }
      }

      let btnList = []
      let btnConfig = {
        tel: { txt: '电话客服', clickFn: this.clickTelBtnFn },
        qq: { txt: 'QQ客服', clickFn: this.clickQQBtnFn }
      }

      for (let i = 0; i < length; i++) {
        let key = serviceType[i]
        btnList.push(
          <div key={`ctm-ser-${i}`} className={styles['btn-box']} style={boxStyle[key]} onClick={btnConfig[key].clickFn}>
            <span className={styles['iconfont'] + ' ' + styles['btn'] + ' ' + styles[`${key}`]} style={btnStyles[key]}>
              {btnConfig[key].txt}
            </span>
          </div>
        )
      }
      return btnList
    }
    refCallBackFn(dom) {
      if (dom) {
        let height = dom.clientHeight
        this.mainDom = dom
        this.setState({ height })
      }
    }

    render() {
      const { compid, onClick = null } = this.props
      const btnList = this.getBtnListFn()
      return (
        <div id={compid} ref={this.refCallBackFn} className={styles['main']} onClick={onClick}>
          {btnList}
        </div>
      )
    }
  }
)
