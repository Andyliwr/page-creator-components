import React, { Component } from 'react'

import { Text, Image } from 'page-creator-components'

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>文本组件</h1>
        <Text html='&lt;p style="color: red"&gt;hello world&lt;/p&gt;' />
        <h1>图片组件</h1>
        <Image src="https://fs.andylistudio.com/1551778567797.png" alt="吃吃吃" width="249px" height="216px" />
      </div>
    )
  }
}
