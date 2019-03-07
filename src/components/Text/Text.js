/*
 * @Description: 普通文本组件
 * @Author: lidikang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-03-07 11:57:00
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Base from '../../Base'

import styles from './Text.css'

export default Base(class Text extends Component {
  static propTypes = {
    html: PropTypes.string
  }

  render() {
    const { id, html } = this.props

    return <div data-id={id} className={styles.main} dangerouslySetInnerHTML={{ __html: html }} />
  }
})
