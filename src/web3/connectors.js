import {ChainId, getRpcUrl} from './address'
import {changeShowConnectWall, changeShowSwitchWallet} from '../redux/actions/index'
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector'
import {UnsupportedChainIdError, useWeb3React} from '@web3-react/core'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import { useCallback, useMemo, useEffect } from 'react'
import store from '../redux/store'

export const SCAN_ADDRESS = {
  [ChainId.ETH]: 'https://etherscan.io',
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.HECO]: 'https://hecoinfo.com',
  [ChainId.MATIC]: 'https://polygonscan.com/',
}


const networkConf = {
  [ChainId.ETH]: {
    chainId: '0x1'
  },
  [ChainId.HECO]: {
    chainId: '0x80',
    chainName: 'HECO',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: [
      'https://http-mainnet-node.huobichain.com',
    ],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.HECO]],
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
  },
  [ChainId.MATIC]: {
    chainId: '0x89',
    chainName: 'MATIC',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.MATIC]],
  }
}


export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.ETH, ChainId.BSC, ChainId.LOCALHOST],
})

export const changeNetwork = chainId => new Promise(reslove => {
  const {ethereum} = window
  if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
    ethereum.request({
      method: chainId == ChainId.ETH ? 'wallet_switchEthereumChain' : 'wallet_addEthereumChain',
      params: [
        {
          ...networkConf[chainId]
        }
      ],
    }).then(() => {
      setTimeout(reslove, 500)
    })
  } else {
    reslove()
  }
})

export const POLLING_INTERVAL = 12000

const ethWalletConnector = new WalletConnectConnector({
  rpc: {[ChainId.ETH]: getRpcUrl(ChainId.ETH)},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const bscWalletConnector = new WalletConnectConnector({
  rpc: {56: 'https://bsc-dataseed.binance.org/'},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const hecoWalletConnector = new WalletConnectConnector({
  rpc: {128: 'https://http-mainnet-node.huobichain.com'},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const maticWalletConnector = new WalletConnectConnector({
  rpc: {137: 'https://rpc-mainnet.maticvigil.com'},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletConnector = {
  [ChainId.ETH]: ethWalletConnector,
  [ChainId.HECO]: hecoWalletConnector,
  [ChainId.BSC]: bscWalletConnector,
  [ChainId.MATIC]: maticWalletConnector
}

export const useConnectWallet = () => {
  const {activate, deactivate, active} = useWeb3React()
  const connectWallet = useCallback((connector, chainId) => changeNetwork(chainId).then(() => activate(connector, undefined, true)
    .then(e => {
      // 隐藏切换网络弹窗
      store.getState().index.showSwitchWallet && store.dispatch(changeShowSwitchWallet({showSwitchWallet: false}))
      store.getState().index.showConnectWallet && store.dispatch(changeShowConnectWall({showConnectWallet: false}))
      if (window.ethereum && window.ethereum.on) {
        // 监听钱包事件
        console.log('注册事件')
        // const { ethereum } = window
        window.ethereum.on('accountsChanged', accounts => {
          if (accounts.length === 0) {
            // 无账号，则代表锁定了,主动断开
            deactivate()
          }
          // 账号改了，刷新网页
          // window.location.reload()
        })

        window.ethereum.on('disconnect', () => {
          // 断开连接
          deactivate()
        })

        window.ethereum.on('close', () => {
          // 断开连接
          deactivate()
        })

        window.ethereum.on('message', message => {
          console.log('message', message)
        })
      }
    })
    .catch(error => {
      switch (true) {
        case error instanceof UnsupportedChainIdError:
          console.log('链错了')
          store.dispatch(changeShowSwitchWallet({showSwitchWallet: true}))
          break
        case error instanceof NoEthereumProviderError:
          console.log('不是钱包环境')
          break
        case error instanceof UserRejectedRequestError:
          console.log('用户拒绝连接钱包')
          store.dispatch(changeShowConnectWall({showConnectWallet: true}))
          break
        default:
          console.log(error)
      }
    })), [])

  useEffect(() => {
    !active && connectWallet(injected)
    window.ethereum && window.ethereum.on('networkChanged', () => {
      // 切换网络后，尝试连接
      !active && connectWallet(injected)
    })
  }, [])
  return connectWallet
}
