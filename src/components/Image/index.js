/*
 * @Description: 图片组件
 * @Author: lidikang
 * @LastEditors: lidikang
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-04-26 15:39:03
 */

import React from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'

import styles from './index.css'

export default Base(
  class ImagePreview extends React.PureComponent {
    static defaultProps = {
      src: 'https://s.thsi.cn/js/m/kh/page-creator/img/default.png',
      alt: ''
    };

    static propTypes = {
      compid: PropTypes.string,
      src: PropTypes.string,
      alt: PropTypes.string
    };

    render() {
      const { compid, src, alt } = this.props

      return (
        <img
          id={compid}
          className={styles.main}
          src={src}
          alt={alt}
        />
      )
    }
  }
)
