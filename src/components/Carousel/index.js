/*
 * @Description: 跑马灯
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-03-20 16:38:56
 * @LastEditTime: 2019-05-07 17:51:14
 */

import React from 'react'
import Base from '../../Base'
import styles from './index.less'

export default Base(
  class SwiperPreview extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        top: 0,
        left: 0,
        transition: 'top 1.5s'
      }
    }
    timer = null
    drawFinished = false

    componentDidMount() {
      this.drawFinished = true
    }
    componentWillUnmount() {
      // 当删除组件时，卸载定时器
      if (this.timer) clearInterval(this.timer)
    }

    getStyleFn() {
      let { scrollDirection, color, fontSize, lineHeight } = this.props
      let { top, left, transition } = this.state
      let styleConfig = {
        top: {
          ul: { top: top + 'px', left: 0, transition },
          li: {}
        },
        left: {
          ul: { width: '9999px', top: 0, left: left + 'px' },
          li: { display: 'inline-block', whiteSpace: 'nowrap', marginRight: '50px' }
        }
      }
      let direction = scrollDirection || 'top'
      styleConfig[direction].li.color = color || '#262626'
      if (fontSize) {
        fontSize = fontSize.replace('px', '')
        fontSize = fontSize / 2 + 'px'
      }
      styleConfig[direction].li.fontSize = fontSize || '12px'
      try {
        lineHeight = lineHeight.replace('px', '')
        lineHeight = lineHeight / 2 + 'px'
      } catch (error) {}
      styleConfig[direction].li.lineHeight = lineHeight ? lineHeight + 'px' : '40px'
      return styleConfig[direction]
    }

    getContentListFn({ contents, length, contentList, li, key }) {
      for (let i = 0; i < length; i++) {
        const content = contents[i]
        contentList.push(
          <li key={`${key + i}`} style={li}>
            {content}
          </li>
        )
      }
    }
    getContentBoxFn() {
      let { contents } = this.props
      contents = contents || []
      let contentList = []
      let { ul, li } = this.getStyleFn()
      let length = contents.length
      if (length > 0) {
        let key = 'carousel1-'
        this.getContentListFn({ contents, length, contentList, li, key })
        key = 'carousel2-'
        this.getContentListFn({ contents, length, contentList, li, key })
      }
      return (
        <ul className={styles['ul']} style={ul} ref="carouselContentBox">
          {contentList}
        </ul>
      )
    }

    scrollContentFn({ speed, scrollDirection }) {
      if (!this.drawFinished) return
      if (this.timer) clearTimeout(this.timer)
      let { contents } = this.props
      if (!contents || contents.length === 0) return
      speed = speed ? speed * 1000 : 2000
      this.timer = setTimeout(() => {
        let { lineHeight = 40, speed } = this.props
        let { top, left, transition } = this.state

        if (scrollDirection === 'left') {
          let children = this.refs.carouselContentBox.children
          let contentBoxWidth = 0
          for (let i = 0, length = children.length; i < length; i++) {
            contentBoxWidth += children[i].clientWidth || 0
            contentBoxWidth += 50
          }
          speed = 30 / 1000
          if (left <= -(contentBoxWidth / 2)) {
            left = 0
          }
          left -= 1
          this.setState({ left })
        } else if (scrollDirection === 'top') {
          top -= lineHeight
          transition = 'top 1.5s'
          this.setState({ top: top || 0, transition })
          if (top <= -this.refs.carouselContentBox.clientHeight / 2) {
            setTimeout(() => {
              this.setState({ top: 0, transition: '' })
            }, 1501)
          }
        }

        this.scrollContentFn({ speed, scrollDirection })
      }, speed)
    }

    render() {
      let { compid, speed, scrollDirection, onClick = null } = this.props

      const contentBox = this.getContentBoxFn()
      this.scrollContentFn({ speed: (speed || 2) - 1.5, scrollDirection: scrollDirection || 'top' })
      return (
        <div id={compid} className={styles['main']} onClick={onClick}>
          {contentBox}
        </div>
      )
    }
  }
)
