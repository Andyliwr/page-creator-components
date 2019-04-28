import React from 'react'
import ReactDOM from 'react-dom';

const Base = BaseComponent => class extends React.Component {
    // 处理app传过来的事件
    componentDidMount() {
      // click
      const { eventClick } = this.props;
      // eslint-disable-next-line react/no-find-dom-node
      const $this = ReactDOM.findDOMNode(this);
      if (typeof eventClick === 'function') {
        $this.addEventListener('click', eventClick)
      }
      // TODO 添加其他需要支持自定义的事件
    }

    render() {
      const { property } = this.props;
      return <BaseComponent {...property} />
    }
  }

export default Base
