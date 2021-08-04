export const ChainId = {
  BSC: 56,
  HECO: 128,
  MATIC: 137
}


export const getRpcUrl = chainId => {
  const RPC_URLS = {
    [ChainId.HECO]: 'https://http-mainnet-node.huobichain.com',
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com'
  }
  return RPC_URLS[chainId]
}
export const getTokenName = address=>{
  const Address = address.toLocaleLowerCase()
  switch (Address) {
    case '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270':
      return 'MATIC'
    case '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8':
      return 'GUARD'
    default:
      return ''
  }
}
