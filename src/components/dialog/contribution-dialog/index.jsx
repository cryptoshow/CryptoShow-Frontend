import React, {useEffect, useState} from 'react'
import {Button, message, Modal} from 'antd'
import './index.less'
import {getContract} from "../../../web3";
import {useWeb3React} from "@web3-react/core";
import ERC20 from '../../../web3/abi/ERC20.json'
import {OFFERING_ADDRESS} from "../../../pages/investment";
import offeringAbi from "../../../web3/abi/offering.json";
import {FormattedMessage} from "react-intl";
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

export default function ContributionDialog({visible, onClose = () => false, amount, closable = true, getData}) {
  const {library, account} = useWeb3React()
  const [approveLoading, setApproveLoading] = useState(false)
  const [contributeLoading, setContributeLoading] = useState(false)
  const [allowance, setAllowance] = useState(0)

  const getTokenAllowance = () => {
    if (!account){
      return
    }
    const contract = getContract(library, ERC20.abi, USDT_ADDRESS)
    contract.methods
      .allowance(account, OFFERING_ADDRESS)
      .call({from: account})
      .then((allowance_) => {
        setAllowance(allowance_)
      })
      .catch(() => {
        setAllowance(0)
      })
  }

  useEffect(() => {
    if (!approveLoading && account){
      getTokenAllowance()
    }
  }, [approveLoading, account])

  const onApprove = () => {
    if (!account){
      return
    }
    setApproveLoading(true)
    const contract = getContract(library, ERC20.abi, USDT_ADDRESS)
    contract.methods
      .approve(
        OFFERING_ADDRESS,
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({from: account})
      .on('receipt', () => {
        message.success('success')
        setApproveLoading(false)
      })
      .on('error', () => {
        message.error('fail')
        setApproveLoading(false)
      })
  }

  const onContribute = () => {
    setContributeLoading(true)
    const pool_contract = getContract(
      library,
      offeringAbi,
      OFFERING_ADDRESS
    )
    pool_contract.methods
      .offer()
      .send({ from: account })
      .on('receipt', ()=> {
        message.success('contribute success')
        setContributeLoading(false)
        getData()
      })
      .on('error', () => {
        message.error('contribute fail')
        setContributeLoading(false)
      })
  }

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onClose}
      centered
      closable={closable}
      destroyOnClose
      wrapClassName="contribution_dialog_wrap"
    >
      <div className="text_center">
        <h1>{amount} USDT</h1>
        <p><FormattedMessage id="investment_text8"/></p>
        <div className="btn-group">
          <Button className="btn-group-item btn-approve" type="primary" onClick={onApprove} loading={approveLoading} disabled={allowance > 0}>
            <FormattedMessage id="investment_text9"/>
          </Button>
          <Button className="btn-group-item btn-contribute" type="primary" disabled={allowance <= 0} loading={contributeLoading} onClick={onContribute}>
            <FormattedMessage id="investment_text10"/>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
