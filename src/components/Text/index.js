/*
 * @Description: 普通文本组件
 * @Author: lidikang
 * @LastEditors: lidikang
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-05-07 15:47:19
 */

import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import HTMLDecoderEncoder from 'html-encoder-decoder'
import Base from '../../Base'

import styles from './index.css'

export default Base(
  class TextPreview extends React.PureComponent {
    static defaultProps = {
      html: ''
    };

    static propTypes = {
      compid: PropTypes.string,
      html: PropTypes.string,
      onClick: PropTypes.func
    };

    render() {
      const { compid, html, onClick = null } = this.props

      return (
        <div id={compid} className={styles.main} onClick={onClick}>
          {ReactHtmlParser(HTMLDecoderEncoder.decode(html))}
        </div>
      )
    }
  }
)
