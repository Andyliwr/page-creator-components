/*
 * @Description: 输入框组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-04-08 16:38:56
 * @LastEditTime: 2019-05-07 17:48:28
 */
import React from 'react'
import Base from '../../Base'
import styles from './index.less'

export default Base(
  class InputPreview extends React.PureComponent {
    constructor(props) {
      super(props)
      this.clickBtnFn = this.clickBtnFn.bind(this)
      this.refCallBackFn = this.refCallBackFn.bind(this)
    }
    inputListDom = null

    clickBtnFn() {
      let inputList = this.inputListDom.children
      let params = { data: [] }
      for (let i = 0, length = inputList.length; i < length; i++) {
        let input = inputList[i]
        let value = input.value || ''
        let label = input.getAttribute('label') || ''
        let name = input.getAttribute('name') || ''
        let required = input.getAttribute('data-required')
        if (required === 'true' && !value) {
          window.alert('请将输入框填写完整')
          return false
        }
        params.data.push({ value, label, name })
      }
      axios.post('http://172.28.80.82:3001/action/upload-input-form', params).then(res => {
        console.log(res)
      })
    }

    getInputListFn() {
      const { raduisType, isRequired, contents, pinyins, inputBorderColor, inputBackground, inputHeight, inputColor } = this.props
      let height = '40px'
      height = inputHeight.toString().replace('px', '') / 2 + 'px'
      let inputStyle = {
        color: inputColor,
        height,
        lineHeight: height,
        background: inputBackground,
        borderColor: inputBorderColor
      }
      height = height.replace('px', '') / 2 + 'px'
      if (raduisType === 'circle') inputStyle.borderRadius = height
      let inputList = []
      for (let i = 0, length = contents.length; i < length; i++) {
        let content = contents[i]
        let pinyin = pinyins[i]
        let isRequiredItem = isRequired[i]
        // eslint-disable-next-line jsx-quotes
        inputList.push(<input key={`input-${i}`} className={styles['input']} type="text" name={pinyin} label={content} data-equired={isRequiredItem} style={inputStyle} />)
      }
      return inputList
    }

    getBtnFn() {
      const { raduisType, btnName, btnColor, btnHeight, btnBackground } = this.props

      let button = []
      let height = '40px'
      height = btnHeight.toString().replace('px', '') / 2 + 'px'
      let btnStyle = {
        background: btnBackground,
        height,
        lineHeight: height,
        color: btnColor
      }
      height = height.replace('px', '') / 2 + 'px'
      if (raduisType === 'circle') btnStyle.borderRadius = height
      button.push(
        <div key={`btn`} className={styles['btn']} style={btnStyle} onClick={this.clickBtnFn}>
          {btnName}
        </div>
      )
      return button
    }
    refCallBackFn(dom) {
      if (dom) {
        let height = dom.clientHeight
        this.inputListDom = dom
        this.setState({ height })
      }
    }

    render() {
      const { compid, onClick = null } = this.props
      let inputList = this.getInputListFn()
      let Button = this.getBtnFn()
      return (
        <div id={compid} className={styles['main']} onClick={onClick}>
          <div ref={this.refCallBackFn}>{inputList}</div>
          {Button}
        </div>
      )
    }
  }
)