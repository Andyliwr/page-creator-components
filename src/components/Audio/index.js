/*
 * @Description: 音频组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-04-10 19:11:31
 * @LastEditTime: 2019-05-07 17:51:22
 */
import React from 'react'
import Base from '../../Base'

import styles from './index.less'

export default Base(
  class AudioPreview extends React.PureComponent {
    render() {
      const { compid, url, onClick = null } = this.props
      return <audio id={compid} src={url} controls="controls" className={styles['main']} onClick={onClick} />
    }
  }
)
