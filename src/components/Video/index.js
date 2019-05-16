/*
 * @Description: 视频组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-04-08 16:38:56
 * @LastEditTime: 2019-05-07 15:54:08
 */
import React from 'react'
import Base from '../../Base'
import PropTypes from 'prop-types'
import styles from './index.less'

export default Base(
  class VideoPreview extends React.PureComponent {
    static defaultProps = {
      html: ''
    };

    static propTypes = {
      compid: PropTypes.string,
      url: PropTypes.string,
      onClick: PropTypes.func
    };

    render() {
      const { compid, url, onClick = null } = this.props

      return <video
        id={compid}
        src={url}
        controls
        onClick={onClick}
        className={styles['main']}
      />
    }
  }
)
