/*
 * @Description: 图片轮播组件
 * @Author: wangyifan
 * @LastEditors: lidikang
 * @Date: 2019-03-05 16:38:56
 * @LastEditTime: 2019-05-07 16:28:41
 */

import React from 'react'
import Base from '../../Base'
import PropTypes from 'prop-types'
import styles from './index.less'

export default Base(
  class SwiperPreview extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        left: 0,
        speed: 2,
        transition: 'all 1.5s'
      }
    }

    static defaultProps = {
      width: 328,
      height: 180,
      fileList: []
    }

    static propTypes = {
      compid: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      fileList: PropTypes.array,
      speed: PropTypes.number,
      onClick: PropTypes.func
    }

    timer = null
    count = 0

    setimgeFn() {
      this.timer = setTimeout(() => {
        this.setImageScrollFn()
      })
    }

    setImageScrollFn() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let { width, fileList, speed } = this.props
        speed = speed > 1.5 ? speed : 1.5
        const imageNum = fileList.length
        if (imageNum <= 1) return

        setTimeout(() => {
          if (this.timer) clearTimeout(this.timer)
          this.setImageScrollFn()
        }, speed * 1000)

        const { left } = this.state
        let transition = 'all 1.5s'
        let endleft = left - width
        this.setState({ left: endleft, transition, speed })
        this.count++
        if (this.count >= imageNum) {
          endleft = 0
          this.count = 0
          transition = ''
          setTimeout(() => {
            this.setState({ left: endleft, transition })
          }, 1500)
        }
      }, this.state.speed * 1000)
    }

    componentDidMount() {
      this.setImageScrollFn()
    }
    componentWillUnmount() {
      // 当删除组件时，卸载定时器
      if (this.timer) clearInterval(this.timer)
    }

    getImageListFn() {
      const { width, height, fileList } = this.props
      const imageList = []
      const size = fileList ? fileList.length : 0

      // 没有图片就显示默认一张图片
      if (size === 0) {
        let imageSrc = '/images/preview/image-black.png'
        imageList.push(
          <li key={0} className={styles['scroll-li']}>
            <img src={imageSrc} width={width} height={height} />
          </li>
        )
      } else {
        for (let i = 0; i <= size; i++) {
          let index = i
          if (index === size) {
            if (size <= 1) continue
            index = 0
          }
          const image = fileList[index] || {}
          let imageSrc = ''
          if (typeof image === 'string') {
            imageSrc = image
          } else {
            let { url, thumbUrl } = image
            imageSrc = url || thumbUrl
          }
          imageList.push(
            <li key={i} className={styles['scroll-li']}>
              <img src={imageSrc} width={width} height={height} />
            </li>
          )
        }
      }

      return imageList
    }

    render() {
      const { compid, fileList, onClick = null } = this.props

      let { left, transition } = this.state
      const size = fileList ? fileList.length : 0
      const imageList = this.getImageListFn()
      if (size > 1) {
        this.setImageScrollFn()
      } else {
        left = 0
        transition = ''
      }
      let width = 100 * size + '%'
      return (
        <div className={styles.main} id={compid} onClick={onClick}>
          <ul className={styles['scroll-ul']} style={{ width, left, transition }}>
            {imageList}
          </ul>
        </div>
      )
    }
  }
)
