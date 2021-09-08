import React from 'react'
import {Button, Modal} from 'antd'
import './index.less'
import {FormattedMessage} from 'react-intl'
import {changeNetwork} from '../../../web3/connectors'
import {ChainId} from '../../../web3/address'

function SwitchWalletDialog({visible, onClose = ()=>false, closable = true, netWorkId = ChainId.ETH}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      closable={closable}
      onCancel={onClose}
      centered
      destroyOnClose
      wrapClassName="switch_wallet_dialog_wrap"
    >
      <h1><FormattedMessage id="switch_wallet_dialog_text1"/></h1>
      <p>
        <FormattedMessage id="switch_wallet_dialog_text2"/>
      </p>
      <p>
        <FormattedMessage id="switch_wallet_dialog_text3"/>
      </p>
      <div className="dialog_footer">
        <Button className="dismiss_btn" type="primary" size="large" onClick={() => {
          changeNetwork(netWorkId).then()
        }}>
          <FormattedMessage id="switch_wallet_dialog_text4"/>
        </Button>
      </div>
    </Modal>
  )
}
export default SwitchWalletDialog
