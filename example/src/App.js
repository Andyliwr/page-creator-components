import React, { Component } from 'react'

import { Text, Image } from 'page-creator-components'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.recordClick = this.recordClick.bind(this);
  }

  recordClick(e) {
    console.log('你点击了组件', e)
  }

  render () {
    return (
      <div>
        <h1>文本组件</h1>
        <Text id="1" html='&lt;p style="color: red"&gt;hello world&lt;/p&gt;' />
        <h1>图片组件</h1>
        <Image id="2" src="https://fs.andylistudio.com/1551778567797.png" alt="吃吃吃" width="249px" height="216px" onClick={this.recordClick} />
      </div>
    )
  }
}
