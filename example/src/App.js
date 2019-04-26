import React, { Component, Fragment } from 'react'

import { Text, Image } from 'page-creator-components'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.parentMethods = {
      openImgDialog: () => { console.log('打开图片弹窗，请在模板中尝试') },
      closeImgDialog: () => { console.log('关闭图片弹窗，请在模板中尝试') },
      openTextDialog: () => { console.log('打开文字弹窗，请在模板中尝试') }
    }
  }

  recordClick(e) {
    console.log('你点击了组件', this)
  }

  render() {
    return (
      <Fragment>
        <p className='title'>文本组件</p>
        <Text html='这是一段文本，哈哈哈哈' />

        <p className='title'>图片组件</p>
        <Image src='http://u.thsi.cn/imgsrc/level/7e2d4806bce3c2aec1b77db665449555.png' methods={this.parentMethods} />
      </Fragment>
    )
  }
}
