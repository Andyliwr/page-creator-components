import React from 'react'
import ReactDOM from 'react-dom'
import Text from './Text'

describe('Text', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Text html="hello world!" />, div)
  })
})
