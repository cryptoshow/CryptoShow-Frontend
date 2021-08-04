import React from 'react'
import './index.less'
import {FormattedMessage} from 'react-intl'
import {changeLanguage} from '../../redux/actions'
import {connect} from 'react-redux'
import {injected, useConnectWallet} from '../../web3/connectors'
import {useWeb3React} from '@web3-react/core'
import {Button} from 'antd'
import {ChainId} from '../../web3/address'
import Banner from '../../components/banner/index'
import Footer from '../../components/footer/index'
import NFT1 from '../../assets/image/home/NFT1@2x.png'
import NFT2 from '../../assets/image/home/NFT2@2x.png'
import NFT3 from '../../assets/image/home/NFT3@2x.png'
import HomeIcon1 from '../../assets/image/home/home_icon_1@2x.png'
import HomeIcon2 from '../../assets/image/home/home_icon_2@2x.png'
import HomeIcon3 from '../../assets/image/home/home_icon_3@2x.png'
import HomeIcon4 from '../../assets/image/home/home_icon_4@2x.png'
import Module3_Pic from '../../assets/image/home/module3_pic@2x.png'
import Module3_Pic_H5 from '../../assets/image/home/module3_pic_h5@2x.png'
import Left_Pic from '../../assets/image/home/left_pic@2x.png'
import Right_Pic from '../../assets/image/home/right_pic@2x.png'
import Left_Pic_H5 from '../../assets/image/home/left_pic_h5@2x.png'
import Right_Pic_H5 from '../../assets/image/home/right_pic_h5@2x.png'
import Mechanism_1 from '../../assets/image/home/mechanism_1@2x.png'

const Home = ({changeLanguage: changeLanguage_, language}) => {
  const connectWallet = useConnectWallet()
  const {chainId, active} = useWeb3React()
  const onConnect = () => {
    connectWallet(injected, ChainId.MATIC).then(() => {
    })
  }
  return (
    <div className='home-page'>
      <Banner />
      <div className='home-page_box' style={{ background: '#FBFCF5' }}>
        <div className='home-page_module_1'>
          <h2>
            <FormattedMessage id='home_text_1' />
          </h2>
          <div className='home-page_module_1_content'>
            <div className='module_1_pic'>
              <img src={NFT1} />
              <p className='NFT_title'>
                <FormattedMessage id='home_text_2' />
              </p>
              <p className='NFT_tip'>
                <FormattedMessage id='home_text_3' />
              </p>
              <a className='NFT_link' href=''>
                <FormattedMessage id='home_text_4' />
              </a>
            </div>
            <div className='module_1_pic module_1_pic_active'>
              <img src={NFT2} />
              <p className='NFT_title'>
                <FormattedMessage id='home_text_2' />
              </p>
              <p className='NFT_tip'>
                <FormattedMessage id='home_text_3' />
              </p>
              <a className='NFT_link' href=''>
                <FormattedMessage id='home_text_4' />
              </a>
            </div>
            <div className='module_1_pic'>
              <img src={NFT3} />
              <p className='NFT_title'>
                <FormattedMessage id='home_text_2' />
              </p>
              <p className='NFT_tip'>
                <FormattedMessage id='home_text_3' />
              </p>
              <a className='NFT_link' href=''>
                <FormattedMessage id='home_text_4' />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='home-page_box' style={{ background: '#fff' }}>
        <div className='home-page_module_2'>
          <h2>
            <FormattedMessage id='home_text_5' />
          </h2>
          <div className='home-page_module_2_content'>
            <div className='module_2_pic'>
              <img src={HomeIcon1} />
              <p className='NFT_title'>
                <FormattedMessage id='home_text_6' />
              </p>
              <p className='NFT_tip'>
                <FormattedMessage id='home_text_7' />
              </p>
            </div>
            <div className='module_2_pic'>
              <img src={HomeIcon2} />
              <p className='NFT_title'>
                <FormattedMessage id='home_text_8' />
              </p>
              <p className='NFT_tip'>
                <FormattedMessage id='home_text_9' />
              </p>
            </div>
            <div className='module_2_pic'>
              <img src={HomeIcon3} />
              <p className='NFT_title'>
                <FormattedMessage id='home_text_10' />
              </p>
              <p className='NFT_tip'>
                <FormattedMessage id='home_text_11' />
              </p>
            </div>
            <div className='module_2_pic'>
              <img src={HomeIcon4} />
              <p className='NFT_title'>
                <FormattedMessage id='home_text_12' />
              </p>
              <p className='NFT_tip'>
                <FormattedMessage id='home_text_13' />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='home-page_box'>
        <div className='home-page_module_3'>
          <h2>
            <FormattedMessage id='home_text_14' />
          </h2>
          <p className='title_tip'>
            <FormattedMessage id='home_text_15' />
          </p>
          <img className='module3_pic' src={Module3_Pic} />
          <img className='module3_pic_h5' src={Module3_Pic_H5} />
        </div>
      </div>
      <div className='home-page_module_4'>
        <div className='left_content'>
          <img src={Left_Pic} />
          <div className='left_content_box'>
            <h3 className='left_content_title'>
              <FormattedMessage id='home_text_16' />
            </h3>
            <p className='left_content_tip'>
              <FormattedMessage id='home_text_17' />
            </p>
          </div>
          <img className='left_pic_h5' src={Left_Pic_H5} />
        </div>
        <div className='right_content'>
          <div className='left_content_box right_content_box'>
            <h3 className='left_content_title'>
              <FormattedMessage id='home_text_18' />
            </h3>
            <p className='left_content_tip'>
              <FormattedMessage id='home_text_19' />
            </p>
          </div>
          <img src={Right_Pic} />
          <img className='left_pic_h5' src={Right_Pic_H5} />
        </div>
      </div>
      <div className='home-page_module_5'>
        <div className='home-page_module_5_box'>
          <h2>
            <FormattedMessage id='home_text_20' />
          </h2>
          <div className='mechanism_box'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
        </div>
        <div className='home-page_module_5_box'>
          <h2>
            <FormattedMessage id='home_text_21' />
          </h2>
          <div className='mechanism_box'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
        </div>
      </div>

      <div className='home-page_module_5_h5'>
        <div className='home-page_module_5_box'>
          <h2>
            <FormattedMessage id='home_text_20' />
          </h2>
          <div className='mechanism_box'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
        </div>
        <div className='home-page_module_5_box'>
          <h2>
            <FormattedMessage id='home_text_21' />
          </h2>
          <div className='mechanism_box'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
          <div className='mechanism_box mechanism_box_style'>
            <img src={Mechanism_1} />
            <span className='line'></span>
            <img src={Mechanism_1} />
          </div>
        </div>
      </div>

      <Footer />
      {/* <span onClick={() => changeLanguage_({language: language === 'zh' ? 'en' : 'zh'})}>
        <FormattedMessage id="xx_text1"/>
      </span>
      <p>chainId:{chainId}, active:{String(active)}
        <Button onClick={onConnect}>connect</Button>
      </p> */}
    </div>
  )
}
export default connect(
  state => state.index, {
    changeLanguage
  }
)(Home)
