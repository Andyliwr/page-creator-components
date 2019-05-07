/*
 * @Description: 音频组件
 * @Author: wangyifan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-10 19:11:31
 * @LastEditTime: 2019-04-18 10:20:02
 */
import React from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';

import styles from './index.less';

export default Base(
  class AudioPreview extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    
    render() {
      const { id, url } = this.props;
      return (
        <audio src={url} controls="controls" className={styles['preview-main']}></audio>
      )
    }
  }
);