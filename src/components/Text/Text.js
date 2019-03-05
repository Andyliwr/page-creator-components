/*
 * @Description: 普通文本组件
 * @Author: lidikang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-03-05 17:19:41
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Text.css'

export default class Text extends Component {
  static propTypes = {
    html: PropTypes.string
  }

  render() {
    const { html } = this.props

    return <div className={styles.main} dangerouslySetInnerHTML={{ __html: html }} />
  }
}
