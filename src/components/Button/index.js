/*
 * @Description: 按钮组件
 * @Author: wangyifan
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-04-26 20:31:26
 */
import React from 'react';
import PropTypes from 'prop-types';
import Base from '../Base';
import styles from './index.less';

export default Base(
  class ButtonPreview extends React.PureComponent {
    constructor(props){
      super(props);
      this.state = { height: 40 };
      this.refCallBackFn = this.refCallBackFn.bind(this);
    }
    mainDom = null; 

    getStyleFn(){
      const {btnStyle, fontSize, color, background } = this.props;
      let { height } = this.state;
      if(this.mainDom) height = this.mainDom.clientHeight;

      let halfFontSize = fontSize.replace('px', '');
      halfFontSize = halfFontSize / 2  + 'px';
      const buttonStyles = { fontSize: halfFontSize, color };
      if(btnStyle != 'text'){
        buttonStyles.background = background;
      }else{
        buttonStyles.textDecoration = 'underline';
      }
      if(btnStyle === 'square') buttonStyles.borderRadius = '4px';
      if(height){
        buttonStyles.lineHeight = `${height}px`;
        if(btnStyle === 'circle') buttonStyles.borderRadius = `${height / 2}px`;
      }
      return buttonStyles;
    }

    refCallBackFn(dom){
      if(dom){
        this.mainDom = dom;
        let height = dom.clientHeight;
        this.setState({ height });
      }
    }

    render(){
      let { id, btnStyle, btnTxt } = this.props;
      let buttonStyles = this.getStyleFn();
      if(btnStyle === 'text') btnTxt += ' >>';
      return (
        <div data-id={id} ref={this.refCallBackFn} className={styles['preview-main']} style={buttonStyles} >
          {btnTxt}
        </div>
      );
    }
  }
);



