/*
 * @Description: 折叠面板
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-04-08 16:38:56
 * @LastEditTime: 2019-05-07 17:51:09
 */
import React from 'react'
import Base from '../../Base'

import styles from './index.less'

export default Base(
  class CollapsePreview extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        status: true // true: open, false: close
      }
      this.clickHeaderFn = this.clickHeaderFn.bind(this)
    }
    clickHeaderFn() {
      let { status } = this.state
      this.setState({ status: !status })
    }

    getHeaderFn() {
      const { type, headerContent, headerBackground, pointColor, headerImage, bodyImage } = this.props
      let { status } = this.state

      let header = ''
      let imgSrc = ''
      if (type === 'image') {
        if (status && bodyImage[0]) return ''
        if (!status) imgSrc = headerImage[0] || ''
      }
      if (imgSrc) {
        header = (
          <div onClick={this.clickHeaderFn}>
            <img src={imgSrc} style={{ width: '100%' }} />
          </div>
        )
      } else {
        let pointStyle = { color: pointColor }
        if (status) pointStyle.transform = 'rotate(180deg)'
        let contentStyle = { background: headerBackground }
        header = (
          <div className={styles['header']} style={contentStyle} onClick={this.clickHeaderFn}>
            <div style={{ display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: headerContent }} />
            <i style={pointStyle} className={styles['iconfont'] + ' ' + styles['point']} />
          </div>
        )
      }

      return header
    }

    getBodyFn() {
      const { type, bodyContent, bodyBackground, bodyImage } = this.props
      let { status } = this.state
      if (!status) return ''

      let body = ''
      let imgSrc = type === 'image' && status ? bodyImage[0] || '' : ''
      if (imgSrc) {
        body = (
          <div onClick={this.clickHeaderFn}>
            <img src={imgSrc} style={{ width: '100%' }} />
          </div>
        )
      } else {
        let bodyStyle = { background: bodyBackground }
        body = <div className={styles['body']} style={bodyStyle} dangerouslySetInnerHTML={{ __html: bodyContent }} />
      }
      return body
    }

    render() {
      const { compid, onClick = null } = this.props
      let header = this.getHeaderFn()
      let body = this.getBodyFn()
      return (
        <div id={compid} className={styles['main']} onClick={onClick}>
          {header} {body}
        </div>
      )
    }
  }
)
