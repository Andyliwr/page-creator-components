/*
 * @Description: 锚点组件
 * @Author: wangyifan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-15 14:50:35
 * @LastEditTime: 2019-04-15 14:51:54
 */
import React from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';

export default Base(
  class MaoPreview extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    
    render() {
      const { id, name } = this.props;
      return (
        <div id={id} data-id={id} data-name={name}></div>
      )
    }
  }
);