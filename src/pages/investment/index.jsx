import React, {useContext, useMemo, useState} from "react";
import Footer from "../../components/footer";
import './index.less'
import {Button, message, Spin} from "antd";
import FailDialog from "../../components/dialog/fail-dialog";
import ContributionDialog from "../../components/dialog/contribution-dialog";
import {getContract} from "../../web3";
import {useWeb3React} from "@web3-react/core";
import offeringAbi from '../../web3/abi/offering.json'
import {formatAmount} from "../../utils/format";
import {getOnlyMultiCallProvider, processResult} from "../../web3/multicall";
import {Contract} from "ethers-multicall-x";
import { VarContext } from '../../context'
import SwitchWalletDialog from "../../components/dialog/switch-wallet-dialog";
import {ChainId, SHOW_ADDRESS} from "../../web3/address";
import {FormattedMessage} from "react-intl";

export const OFFERING_ADDRESS = '0xEB62510B8529d881A7D18bf035dF7f58024D5d35'

export default function Investment(){
  const [visibleFailDialog, setVisibleFailDialog] = useState(false)
  // const [visibleContributionDialog, setVisibleContributionDialog] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)
  const [loadLoading, setLoadLoading] = useState(true)
  const [visibleSwitchWallet, setVisibleSwitchWallet] = useState(false)
  const {account, library, chainId} = useWeb3React()
  const { balance, blockHeight } = useContext(VarContext)
  const [data, setData] = useState({
    unlockCapacity: '0',
    quota: '0',
    volume: '0'
  })

  const getData = () => {
    const multicallProvider = getOnlyMultiCallProvider(chainId)
    const contract = new Contract(OFFERING_ADDRESS, offeringAbi)
    const promiseAll = [
      contract.unlockCapacity(account), // claim余额
      contract.getQuota(account), // 可用额度 Allocation
      contract.getVolume(account), // 可获得标的物的量 TOKEN Allocation
    ]
    multicallProvider.all(promiseAll).then(data => {
      const [unlockCapacity, quota, volume] = processResult(data)
      setData({
        unlockCapacity: formatAmount(unlockCapacity),
        quota: formatAmount(quota),
        volume: formatAmount(volume)
      })
      setLoadLoading(false)
      // 不在白名单
      if (Number(quota) === 0){
        setVisibleFailDialog(true)
      }
    })
  }
  useMemo(() => {
    setVisibleSwitchWallet(chainId !== ChainId.ETH)
  }, [chainId])
  useMemo(() => {
    if (account) {
      getData()
    }
  }, [account, blockHeight])
  const onClaim = () => {
    if (!(data.unlockCapacity > 0)) return
    setClaimLoading(true)
    const pool_contract = getContract(
      library,
      offeringAbi,
      OFFERING_ADDRESS
    )
    pool_contract.methods
      .unlock()
      .send({ from: account })
      .on('receipt', ()=> {
        message.success('claim success')
        setClaimLoading(false)
      })
      .on('error', () => {
        message.error('claim error')
        setClaimLoading(false)
      })
  }
  return (
    <Spin size="large" spinning={loadLoading} tip="loading..." wrapperClassName="investment-page-loading">
      <div className="investment-page">
        <div className="investment-page-box">

          <div className="allocation-cards">
            <div className="allocation-card l">
              <p>USDT Allocation</p>
              <h2>{data.quota} USDT</h2>
            </div>
            <div className="allocation-card r">
              <p>SHOW Token Allocation</p>
              <h2>{data.volume} SHOW</h2>
            </div>
          </div>

          <h1 className="investment-page-title">
            <FormattedMessage id="investment_text1"/>
          </h1>

          <div className="investment-table">
            <div className="tr">
              <div className="td l"><FormattedMessage id="investment_text2"/></div>
              <div className="td r">{SHOW_ADDRESS}</div>
            </div>
            <div className="tr">
              <div className="td l"><FormattedMessage id="investment_text3"/></div>
              <div className="td r">SEED</div>
            </div>
            <div className="tr">
              <div className="td l"><FormattedMessage id="investment_text4"/></div>
              <div className="td r">{balance} SHOW</div>
            </div>
            <div className="tr">
              <div className="td l"><FormattedMessage id="investment_text5"/></div>
              <div className="td r">
                {data.unlockCapacity}
                <Button className="claim-btn" size="small" loading={claimLoading} onClick={onClaim}>
                  <FormattedMessage id="investment_text6"/>
                </Button>
              </div>
            </div>
          </div>

        </div>
        <Footer/>
        <FailDialog visible={visibleFailDialog} closable={false}/>
        <ContributionDialog visible={data.quota > 0} amount={data.quota} closable={false}/>
        <SwitchWalletDialog visible={visibleSwitchWallet} closable={false} netWorkId={ChainId.ETH}/>
      </div>
    </Spin>
  )
}