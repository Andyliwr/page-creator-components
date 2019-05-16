/*
 * @Description: 锚点组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-04-15 14:50:35
 * @LastEditTime: 2019-05-07 16:28:21
 */
import React from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'

export default Base(
  class MaoPreview extends React.PureComponent {
    static defaultProps = {
      name: '锚点'
    }

    static propTypes = {
      compid: PropTypes.string,
      name: PropTypes.string,
      onClick: PropTypes.func
    }
    render() {
      const { compid, name, onClick = null } = this.props
      return <div id={compid} data-name={name} onClick={onClick} />
    }
  }
)
