import React from 'react'
import {Modal} from 'antd'
import './index.less'
import FailSvg from '../../../assets/image/dialog/fail.svg'

export default function FailDialog({visible, onClose = () => false, closable = true}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      closable={closable}
      destroyOnClose
      wrapClassName="fail_dialog_wrap"
    >
      <div className="text_center">
        <img src={FailSvg} alt=""/>
        <p>
          Sorry, you are not eligable for this project since you are not involved in the whitelist.
        </p>
      </div>
    </Modal>
  )
}
