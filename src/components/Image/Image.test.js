import React from 'react'
import ReactDOM from 'react-dom'
import Image from './Image'

describe('Image', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Image src="https://s.thsi.cn/js/m/kh/page-creator/img/default.png" alt="默认图片" width="100px" height="100px" />, div)
  })
})
