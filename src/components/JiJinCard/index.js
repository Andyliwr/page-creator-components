/*
 * @Description: 基金卡片组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-04-19 08:35:08
 * @LastEditTime: 2019-05-07 17:48:33
 */
import React from 'react'
import Base from '../../Base'
import axios from 'axios'
import styles from './index.less'

export default Base(
  class JiJinCardPreview extends React.PureComponent {
    constructor(props) {
      super(props)
      this.getYieldRateHtmlFn = this.getYieldRateHtmlFn.bind(this)
    }
    finishRequest = false
    yieldRateList = {
      name: '',
      date: 0,
      type: '',
      isbuy: '',
      zdsg: '',
      month: '',
      now: '',
      twoyear: '',
      fyear: '',
      hyear: '',
      nowyear: '',
      tmonth: '',
      tyear: '',
      week: '',
      year: ''
    }

    getBtnStyleFn() {
      const { btnColor, btnBackground } = this.props
      let btnStyle = {
        color: btnColor,
        background: btnBackground
      }
      return btnStyle
    }

    getYieldRateFn(productID) {
      // productID: 420003
      axios.get(`http://eq.10jqka.com.cn/eq/qsadmin/interface/getJiJinCodeInfo.php?code=${productID}`).then(res => {
        let result = res.data.data
        let keys = Object.keys(this.yieldRateList)
        keys.map(item => {
          this.yieldRateList[item] = result[item]
        })
        this.finishRequest = true
      })
    }

    // componentWillMount(){
    //   this.getYieldRateFn();
    // }

    getYieldRateHtmlFn() {
      let { yieldRate } = this.props
      let yieldRateNum = ''
      if (!this.finishRequest) {
        let timer = setInterval(() => {
          if (this.finishRequest) {
            clearInterval(timer)
            yieldRateNum = this.yieldRateList[yieldRate] || 0
            this.setState({ data: Date.now() })
          }
        }, 500)
      } else {
        yieldRateNum = this.yieldRateList[yieldRate] || 0
      }
      yieldRateNum = parseFloat(yieldRateNum) || 0
      let style = {}
      if (yieldRateNum >= 0) {
        yieldRateNum = '+' + yieldRateNum
      } else {
        yieldRateNum = '-' + yieldRateNum
        style.color = '#30a431'
      }
      yieldRateNum += '%'
      let yieldRateHtml = (
        <div className={styles['yield-rate']} style={style}>
          {yieldRateNum}
        </div>
      )
      return yieldRateHtml
    }

    render() {
      const { compid, productID, title, label1, label2, btnName, yieldRateTxt, onClick = null } = this.props
      if (productID) this.getYieldRateFn(productID)
      let btnStyle = this.getBtnStyleFn()
      let yieldRateHtml = this.getYieldRateHtmlFn()

      return (
        <div id={compid} className={styles['main']} onClick={onClick}>
          <div className={styles['title']}>{title}</div>
          <div className={styles['label-list']}>
            <span className={styles['label']}>{label1}</span>
            <span className={styles['label']}>{label2}</span>
          </div>
          {yieldRateHtml}
          <div className={styles['yield-info']}>{yieldRateTxt}</div>
          <div data-eventname='基金按钮' data-eventvalue='jijin-btn' className={styles['btn']}>
            <span style={btnStyle}>{btnName}</span>
          </div>
        </div>
      )
    }
  }
)
