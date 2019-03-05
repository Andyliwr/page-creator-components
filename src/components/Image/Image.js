/*
 * @Description: 图片组件
 * @Author: lidikang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-03-05 17:12:55
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Image.css'

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  }

  render() {
    const { src, alt, width, height } = this.props

    return <img className={styles.main} src={src} alt={alt} width={width} height={height} />
  }
}

Image.defaultProps = {
  src: 'https://s.thsi.cn/js/m/kh/page-creator/img/default.png',
  alt: '',
  width: '100px',
  height: '100px'
}
