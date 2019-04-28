/*
 * @Description: 视频组件
 * @Author: wangyifan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-08 16:38:56
 * @LastEditTime: 2019-04-19 08:34:52
 */
import React from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';

import styles from './index.less';

export default Base(
  class VideoPreview extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    
    render() {
      const { id, url } = this.props;
      return (
        <video data-id={id} src={url} controls="controls" className={styles['preview-main']}></video>
      )
    }
  }
);