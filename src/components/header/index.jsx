import React, { useContext, useState, useMemo } from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { changeLanguage, changeShowConnectWall } from '../../redux/actions'
import { connect } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { changeNetwork } from '../../web3/connectors'
import { ChainId } from '../../web3/address'
import DrawerMenu from '../drawer-menu'
import Logo from '../../assets/image/Logo.svg'
import MenuSvg from '../../assets/image/menu.svg'
import ConnectWallDialog from '../dialog/connect-wallet-dialog'
import { formatAddress } from '../../utils'
import { VarContext } from '../../context'
import BSCLogo from '../../assets/image/home/BSC_logo.svg'
import ETHLogo from '../../assets/image/home/ETH_logo.svg'

export const navList = [
  {
    name: <FormattedMessage id='header_text_1' />,
    path: '/',
  },
  {
    name: <FormattedMessage id='header_text_2' />,
    path: '/nft',
  },
  {
    name: <FormattedMessage id='header_text_3' />,
    path: '/ndr',
  },
  {
    name: <FormattedMessage id='header_text_4' />,
    path: '/crowdfunding',
  },
]

const Header = ({
  changeLanguage: changeLanguage_,
  language,
  showConnectWallet,
  changeShowConnectWall,
}) => {
  // const connectWallet = useConnectWallet()
  const { chainId, active, account } = useWeb3React()
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibleConnectWall, setVisibleConnectWall] = useState(false)
  const { balance } = useContext(VarContext)
  const [walletValue, setWalletValue] = useState(chainId === 1 ? 'ETH' : 'BSC')

  useMemo(() => {
    setWalletValue(chainId === 1 ? 'ETH' : 'BSC')
  }, [chainId])

  return (
    <>
      <div className='header'>
        <div className='header_box'>
          <div className='header_link'>
            <Link to='/'>
              <img className='header_logo' src={Logo} />
            </Link>
            <div className='header_link_nav'>
              {navList.map((item) => (
                // to = { item.path }
                <Link to='' key={item.path}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {
              <div
                className='language'
                onClick={() =>
                  changeLanguage_({ language: language === 'zh' ? 'en' : 'zh' })
                }
              >
                {language === 'zh' ? (
                  <svg
                    t='1628048420796'
                    className='icon'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='3070'
                    width='24'
                    height='24'
                  >
                    <path
                      d='M853.333333 0a170.666667 170.666667 0 0 1 170.666667 170.666667v682.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H170.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V170.666667a170.666667 170.666667 0 0 1 170.666667-170.666667z m0 110.933333H170.666667a59.306667 59.306667 0 0 0-59.306667 54.186667V853.333333a59.306667 59.306667 0 0 0 54.186667 59.306667H853.333333a59.306667 59.306667 0 0 0 59.306667-54.186667V170.666667a59.306667 59.306667 0 0 0-54.186667-59.306667z'
                      p-id='3071'
                    ></path>
                    <path
                      d='M413.44 682.666667a34.986667 34.986667 0 0 0 0-69.973334H312.32v-69.546666h96.426667a32 32 0 0 0 0-64H312.32V411.306667h101.12a32.426667 32.426667 0 0 0 34.56-34.986667 32 32 0 0 0-34.56-34.986667H273.493333c-24.32 0-38.826667 16.64-38.826666 45.226667v250.88c0 28.586667 14.506667 45.226667 38.826666 45.226667z m334.933333 0a36.266667 36.266667 0 0 0 42.666667-39.68V384a42.666667 42.666667 0 1 0-82.346667 0v155.733333h-2.133333l-132.266667-174.933333a49.493333 49.493333 0 0 0-42.666666-23.466667 37.12 37.12 0 0 0-42.666667 40.106667V640a37.973333 37.973333 0 0 0 42.666667 42.666667 37.546667 37.546667 0 0 0 42.666666-42.666667v-157.866667h2.133334l131.413333 176.213334a48.64 48.64 0 0 0 40.533333 24.32z'
                      p-id='3072'
                    ></path>
                  </svg>
                ) : (
                  <svg
                    t='1628048294225'
                    className='icon'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='2939'
                    width='24'
                    height='24'
                  >
                    <path
                      d='M853.333333 0a170.666667 170.666667 0 0 1 170.666667 170.666667v682.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H170.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V170.666667a170.666667 170.666667 0 0 1 170.666667-170.666667z m0 110.933333H170.666667a59.306667 59.306667 0 0 0-59.306667 54.186667V853.333333a59.306667 59.306667 0 0 0 54.186667 59.306667H853.333333a59.306667 59.306667 0 0 0 59.306667-54.186667V170.666667a59.306667 59.306667 0 0 0-54.186667-59.306667z'
                      p-id='2940'
                    ></path>
                    <path
                      d='M351.573333 682.666667a139.52 139.52 0 0 0 133.973334-77.226667 60.16 60.16 0 0 0 5.12-23.893333 35.84 35.84 0 0 0-38.826667-37.12 36.266667 36.266667 0 0 0-35.84 25.173333 68.266667 68.266667 0 0 1-65.706667 45.653333c-45.653333 0-74.24-38.826667-74.24-103.68s28.586667-102.826667 73.813334-102.826666a69.546667 69.546667 0 0 1 65.28 45.226666 38.826667 38.826667 0 0 0 38.4 26.026667 33.28 33.28 0 0 0 35.84-35.413333 67.413333 67.413333 0 0 0-8.106667-30.72A139.52 139.52 0 0 0 349.013333 341.333333C253.013333 341.333333 192 404.053333 192 512s59.733333 170.666667 159.573333 170.666667z m439.466667 0a36.266667 36.266667 0 0 0 42.666667-39.68V384a42.666667 42.666667 0 1 0-82.346667 0v155.733333h-2.133333l-132.266667-174.933333a49.493333 49.493333 0 0 0-42.666667-23.466667 37.12 37.12 0 0 0-42.666666 40.106667V640a37.973333 37.973333 0 0 0 42.666666 42.666667 37.546667 37.546667 0 0 0 42.666667-42.666667v-157.866667h2.133333l131.413334 176.213334a48.64 48.64 0 0 0 40.533333 24.32z'
                      p-id='2941'
                    ></path>
                  </svg>
                )}
              </div>
            }
            {(chainId == ChainId.BSC || chainId == ChainId.ETH) && (
              <div className='switch-wallet'>
                <a className='detail_wallet'>
                  <img src={chainId === 1 ? ETHLogo : BSCLogo} />
                  {walletValue}
                </a>
                <p className='select_wallet_option'>
                  <a
                    className={`wallet_option ${
                      chainId == ChainId.ETH && 'wallet_option_active'
                    }`}
                    onClick={() => {
                      changeNetwork(ChainId.ETH).then(() => {
                        console.log('切换成功！')
                        setWalletValue('ETH')
                      })
                    }}
                  >
                    <img src={ETHLogo} />
                    ETH
                  </a>
                  <a
                    className={`wallet_option ${
                      chainId == ChainId.BSC && 'wallet_option_active'
                    }`}
                    onClick={() => {
                      changeNetwork(ChainId.BSC).then(() => {
                        console.log('切换成功！')
                        setWalletValue('BSC')
                      })
                    }}
                  >
                    <img src={BSCLogo} />
                    BSC
                  </a>
                </p>
              </div>
            )}

            {account ? (
              <div className='account-view'>
                <div className='balance-box'>{balance} SHOW</div>
                <div
                  className='account-box'
                  onClick={() => setVisibleConnectWall(true)}
                >
                  {formatAddress(account, 6, 3)}
                </div>
              </div>
            ) : (
              <a className='wallet' onClick={() => setVisibleConnectWall(true)}>
                <svg
                  t='1628048205709'
                  className='icon'
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  p-id='2807'
                  width='24'
                  height='24'
                >
                  <path
                    d='M853.333333 0a170.666667 170.666667 0 0 1 170.666667 170.666667v682.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H170.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V170.666667a170.666667 170.666667 0 0 1 170.666667-170.666667z m0 110.933333H170.666667a59.306667 59.306667 0 0 0-59.306667 54.186667V853.333333a59.306667 59.306667 0 0 0 54.186667 59.306667H853.333333a59.306667 59.306667 0 0 0 59.306667-54.186667V170.666667a59.306667 59.306667 0 0 0-54.186667-59.306667z'
                    p-id='2808'
                  ></path>
                  <path
                    d='M1024 298.666667v426.666666h-341.333333a213.333333 213.333333 0 0 1 0-426.666666z m-110.933333 315.733333V409.6H682.666667a102.4 102.4 0 0 0-101.973334 95.573333V512a102.4 102.4 0 0 0 95.573334 101.973333h236.8z'
                    p-id='2809'
                  ></path>
                  <path
                    d='M699.733333 512m-59.733333 0a59.733333 59.733333 0 1 0 119.466667 0 59.733333 59.733333 0 1 0-119.466667 0Z'
                    p-id='2810'
                  ></path>
                </svg>
              </a>
            )}

            <a className='more' onClick={() => {}}></a>
          </div>
        </div>
        <div className='menu'>
          <Link to='/'>
            <img className='menu_logo' src={Logo} />
          </Link>
          <img
            className='menu_tab'
            src={MenuSvg}
            alt=''
            onClick={() => setVisibleMenu(true)}
          />
        </div>
      </div>
      <DrawerMenu
        {...{
          account,
          active,
          chainId,
          visible: visibleMenu,
          setVisible: setVisibleMenu,
          changeLanguage: changeLanguage_,
          language,
          setVisibleConnectWall,
          balance,
          changeNetwork,
          ChainId,
        }}
      />
      <ConnectWallDialog
        visible={visibleConnectWall || showConnectWallet}
        closable={!showConnectWallet}
        onClose={() => {
          if (showConnectWallet) return
          setVisibleConnectWall(false)
          changeShowConnectWall({ showConnectWallet: false })
        }}
      />
    </>
  )
}
export default connect((state) => state.index, {
  changeLanguage,
  changeShowConnectWall,
})(Header)
