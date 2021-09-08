import React, {useEffect, useState} from 'react'
import { Modal } from 'antd'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import MathSvg from '../../../assets/image/dialog/math.svg'
import MetamaskSvg from '../../../assets/image/dialog/metamask.svg'
import './index.less'
import {injected, useConnectWallet, walletConnector} from '../../../web3/connectors'
import {ChainId} from '../../../web3/address'

function ConnectWallDialog({visible, onClose = () => false, closable = true}) {
  const connectWallet = useConnectWallet()
  const {chainId, active} = useWeb3ReactCore()
  const defChainId = injected.supportedChainIds.includes(chainId) ? chainId : ChainId.ETH
  const [isLoginAuthorize, setIsLoginAuthorize] = useState(false)
  const onConnectWallMetaMask = () => {
    // const isUnlocked = window.ethereum.isConnected()
    // console.log('isUnlocked', isUnlocked)
    connectWallet(injected, defChainId).then(()=>{
      setIsLoginAuthorize(false)
    }).catch(() => {
      setIsLoginAuthorize(false)
    })
    // if (!isUnlocked) {
    onClose()
    setIsLoginAuthorize(true)
    // }
  }
  useEffect(() => {
    if (isLoginAuthorize && active) {
      setIsLoginAuthorize(false)
    }
  }, [active])
  const onConnectWallSanCode = () => {
    connectWallet(walletConnector[defChainId]).then(onClose)
  }
  return (
    <React.Fragment>
      <Modal
        visible={visible}
        footer={null}
        closable={closable}
        onCancel={onClose}
        centered
        wrapClassName="connect_wallet_dialog_wrap"
        zIndex={1001}
      >
        <div className="connect_wallet_dialog_title">
          <h2>链接钱包</h2>
          <p>请在ETH上连接你的钱包</p>
        </div>
        <div className="connect_wallet_dialog">
          <div className="wallet_item flex_center" onClick={onConnectWallMetaMask}>
            <img src={MetamaskSvg} alt=""/>
            <p>Metamask</p>
          </div>
          <div className="wallet_item flex_center" onClick={onConnectWallSanCode}>
            <img src={MathSvg} alt=""/>
            <p>walletconnect</p>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}
export default ConnectWallDialog
