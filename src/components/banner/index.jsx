import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import './index.less'
import Banner_Pic from '../../assets/image/banner/banner_pic@2x.png'
import Banner_Pic_H5 from '../../assets/image/banner/banner_pic_h5@2x.png'

const Banner = (props) => {
  console.log(props, 'pros')
  return (
    <div className='banner'>
      <div className='content'>
        <div className='banner_content'>
          <div>
            <h2 className='banner_title'>
              <FormattedMessage id='banner_text_1' />
            </h2>
            <p className='banner_text_top'>
              <FormattedMessage id='banner_text_2' />
            </p>
            <p className='banner_text_introduce'>
              <FormattedMessage id='banner_text_3' />
            </p>
          </div>
          <div className='banner_btn'>
            <a
              href={
                props.language === 'en'
                  ? 'https://cryptoshowart.medium.com/introduction-to-cryptoshow-the-worlds-first-permissionless-nft-auction-and-depository-trading-7b0950181769'
                  : 'https://www.chainnews.com/articles/889864955258.htm'
              }
              target='_blank'
            >
              <FormattedMessage id='banner_text_4' />
            </a>
            {/* <a>
              <FormattedMessage id='banner_text_5' />
            </a> */}
          </div>
          <a className='audit_report'>
            <FormattedMessage id='banner_text_6' />
            <svg
              t='1628068067417'
              className='icon'
              viewBox='0 0 1706 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='13628'
              width='14'
              height='14'
            >
              <path
                d='M921.6 972.8l529.066667-682.666667 119.466666-153.6c34.133333-34.133333 17.066667-85.333333-17.066666-119.466666C1536 0 1518.933333 0 1501.866667 0H204.8C153.6 0 119.466667 34.133333 119.466667 85.333333 119.466667 102.4 119.466667 119.466667 136.533333 136.533333l648.533334 836.266667c34.133333 51.2 85.333333 51.2 136.533333 0-17.066667 17.066667 0 17.066667 0 0z'
                p-id='13629'
              ></path>
            </svg>
          </a>
        </div>
        <img className='banner_pic' src={Banner_Pic} />
        <img className='banner_pic_h5' src={Banner_Pic_H5} />
      </div>
    </div>
  )
}

export default connect((store) => ({
  language: store.index.language
}))(withRouter(Banner))
