import React from 'react'

const Base = BaseComponent => {
  return class extends React.Component {
    // 处理app传过来的事件
    componentDidMount() {
      // click
      if (typeof this.props.onClick === 'function') {
        document.querySelector(`*[data-id="${this.props.id}"]`).addEventListener('click', this.props.onClick)
      }
      // TODO 添加其他需要支持自定义的事件
    }

    render() {
      return <BaseComponent {...this.props} />
    }
  }
}

export default Base
