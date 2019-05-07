
/*
 * @Description: 动态数字组件
 * @Author: wangyifan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-18 10:14:51
 * @LastEditTime: 2019-04-25 19:27:52
 */
import React from 'react';
import Base from '../Base';
import styles from './index.less';

export default Base(
  class ActiveNumberPreview extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { number: '', height: '40px'};
      this.refCallBackFn = this.refCallBackFn.bind(this);
    }
    timer = null;
    mainDom = null;

    getStylesFn(){
      const { txtColor, txtFontSize, numColor, numFontSize } = this.props;
      let { height } = this.state;
      if(this.mainDom) height = this.mainDom.clientHeight;
      let newTxtFontSize = txtFontSize;
      let newNumFontSize = numFontSize;
      if (height) height += 'px';
      let lineHeight = height;
      try {
        newTxtFontSize = newTxtFontSize.toString().replace('px', '') / 2 + 'px';
        newNumFontSize = newNumFontSize.toString().replace('px', '') / 2 + 'px';
      } catch (error) {}
      let contentStyle = { color: txtColor, fontSize: newTxtFontSize, lineHeight};
      let numStyle = { color: numColor, fontSize: newNumFontSize, lineHeight};
      return { contentStyle, numStyle };
    }

    getContentFn(){
      const { content, min, max, action, step } = this.props;
      let { number } = this.state;
      let { contentStyle, numStyle } = this.getStylesFn();
      let newContent = [];
      if(number === '') number = action === 'add' ? min : max;
      let numberHtml = (<span style={numStyle}>{number}</span>);
      let middleStr = '!@#$%^&*';
      let htmlArr = content.replace('()', middleStr).split(middleStr);
      for(let i = 0, length = htmlArr.length; i < length; i++ ){
        newContent.push(<span>{htmlArr[i]}</span>);
        if(i == 0) newContent.push(numberHtml);
      }
      
      this.setTimeoutFn(number);
      return (<div style={contentStyle}>{newContent}</div>)
    }
    setTimeoutFn( number ){
      let { timeInterval, min, max, action, step } = this.props;

      let flag = false;
      number = Number(number);
      if(action === 'add' && number < max){
        number += step;
        number = number > max ? max : number;
        flag = true;
      }else if(action === 'del' && number >= min){
        number -= step;
        number = number < min ? min : number;
        flag = true;
      }
      if(!flag) return;
    
      let newTimeInterval = (timeInterval || 1) * 1000;
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ number: number});
      }, newTimeInterval);
    }
    refCallBackFn(dom){
      if(dom){
        this.mainDom = dom;
        let height = dom.clientHeight;
        this.setState({ height });
      }
    }
    
    render() {
      const { id } = this.props;
      let content = this.getContentFn();
      return (
        <div data-id={id} ref={this.refCallBackFn} className={styles['preview-main']}>
          {content}
        </div>
      )
    }
  }
);