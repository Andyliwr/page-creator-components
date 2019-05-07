/*
 * @Description: 倒计时组件
 * @Author: wangyifan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-04-24 15:40:09
 */

import React from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';

import styles from './index.less';

export default Base(
  class SwiperPreview extends React.PureComponent {
    constructor(props){
      super(props);
      this.state = { html: [] };
    }

    timer = null;

    componentDidMount(){
      this.getDateValueFn();
    }
    componentWillUnmount(){
      // 当删除组件时，卸载定时器
      if(this.timer) clearInterval(this.timer);
    }
    
    setNumFormatFn(num){
      if(num < 10)  num = '0' + (num + ''); 
      return num;
    }

    returnDateObjectFn(date){
      let endTime = new Date(date).getTime();
      let nowTime = new Date().getTime();
      let leftTime = endTime - nowTime;
      let days = 0, hours = 0, minutes = 0, seconds = 0;
      
      if(leftTime > 0) {
        leftTime = parseInt(leftTime / 1000);
        days = parseInt(leftTime / (24 * 60 * 60));
        hours = parseInt((leftTime % (24 * 60 * 60)) / (60 * 60));
        minutes = parseInt(leftTime % (60 * 60) / 60);
        seconds = leftTime % 60;
      }
      return {days, hours, minutes, seconds};
    }
    
    getStylesFn(){
      let { txtColor, txtFontSize, timeColor, timeFontSize } = this.props;
      let numStyle = {};
      let txtStyle = {};
      if(txtColor) txtStyle.color = txtColor;
      if(txtFontSize){
        txtFontSize = txtFontSize.replace('px', '');
        txtFontSize = txtFontSize / 2 + 'px';
        txtStyle.fontSize = txtFontSize;
      }
      if(timeColor) numStyle.color = timeColor;
      if(timeFontSize){
        timeFontSize = timeFontSize.replace('px', '');
        timeFontSize = timeFontSize / 2 + 'px';
        numStyle.fontSize = timeFontSize;
      }
      return {numStyle, txtStyle};
    }

    getDateValueFn(){
      let { format, endTime} = this.props;
      if(!endTime){
        this.setTimeoutFn(); 
        if(this.state.html.length > 0) this.setState({html: []});
        return;
      }
      let endTimeObj = this.returnDateObjectFn(endTime);
      let defautlFormat = {days: '天', hours: '时', minutes: '分', seconds: '秒'};
      let defautlFormatKeys = Object.keys(defautlFormat);

      const { numStyle, txtStyle} = this.getStylesFn();
      let html = [];
      for(let key in defautlFormat){
        let value = defautlFormat[key];
        if(format.indexOf(value) > -1){
          let numValue = this.setNumFormatFn(endTimeObj[key]);
          html.push(<span key={'num' + key} style={numStyle}>{numValue}</span>);
          html.push(<span key={'txt' + key} style={txtStyle}>{value}</span>);
        }else{
          let times = value === '天' ? 24 : 60;
          let index = defautlFormatKeys.indexOf(key); // key索引
          let nextKey = defautlFormatKeys[index + 1] || ''; // 下一个key
          if(nextKey){
            endTimeObj[nextKey] += endTimeObj[key] * times;
          }
        }
      }
      this.setState({html});
      this.setTimeoutFn();
    }
    setTimeoutFn(){
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getDateValueFn();
      }, 1000);
    }

    render() {
      const { id } = this.props;
      let { html } = this.state;
      return (
        <div className={styles['preview-main']} data-id={id}>
          <div className={styles['preview-content']}>{html}</div>
        </div>
      );
    }
  }
);
