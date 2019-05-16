/*
 * @Description: 按钮组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-05-07 17:51:19
 */
import React from 'react'
import Base from '../../Base'
import styles from './index.less'

export default Base(
  class ButtonPreview extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = { height: 40 }
      this.refCallBackFn = this.refCallBackFn.bind(this)
    }
    mainDom = null

    getStyleFn() {
      const { btnStyle, fontSize, color, background } = this.props
      let { height } = this.state
      if (this.mainDom) height = this.mainDom.clientHeight

      let halfFontSize = fontSize.replace('px', '')
      halfFontSize = halfFontSize / 2 + 'px'
      const buttonStyles = { fontSize: halfFontSize, color }
      if (btnStyle !== 'text') {
        buttonStyles.background = background
      } else {
        buttonStyles.textDecoration = 'underline'
      }
      if (btnStyle === 'square') buttonStyles.borderRadius = '4px'
      if (height) {
        buttonStyles.lineHeight = `${height}px`
        if (btnStyle === 'circle') buttonStyles.borderRadius = `${height / 2}px`
      }
      return buttonStyles
    }

    refCallBackFn(dom) {
      if (dom) {
        this.mainDom = dom
        let height = dom.clientHeight
        this.setState({ height })
      }
    }

    render() {
      let { compid, btnStyle, btnTxt, onClick = null } = this.props
      let buttonStyles = this.getStyleFn()
      if (btnStyle === 'text') btnTxt += ' >>'
      return (
        <div id={compid} ref={this.refCallBackFn} className={styles['main']} style={buttonStyles} onClick={onClick}>
          {btnTxt}
        </div>
      )
    }
  }
)
