import React from 'react'
import {Button, Modal} from 'antd'
import './index.less'
import FailSvg from '../../../assets/image/dialog/fail.svg'

export default function ContributionDialog({visible, onClose, amount}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      closable={false}
      destroyOnClose
      wrapClassName="contribution_dialog_wrap"
    >
      <div className="text_center">
        <h1>{amount}USD</h1>
        <p>Your Contribution Amounts is</p>
        <div className="btn-group">
          <Button className="btn-group-item btn-approve" type="primary">Approve</Button>
          <Button className="btn-group-item btn-contribute" type="primary">Contribute</Button>
        </div>
      </div>
    </Modal>
  )
}
