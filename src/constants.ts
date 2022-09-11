const defaults = {
  tokenIn: "0xa8754b9Fa15fc18BB59458815510E40a12cD2014",
  tokenOut: "0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5",
};

const assetsIcons = {
  SLP: "https://assets.coingecko.com/coins/images/10366/small/SLP.png",
  WETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  AXS: "https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png",
  WRON: "https://assets.coingecko.com/coins/images/20009/small/ronin.jpg",
  USDC: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
};

const tokensList = [
  {
    symbol: "SLP",
    icon: "https://assets.coingecko.com/coins/images/10366/small/SLP.png",
    name: "Smooth love potion",
    address: "0xa8754b9Fa15fc18BB59458815510E40a12cD2014"
  },
  {
    symbol: "WETH",
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    name: "Wrapped ethereum",
    address: "0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5"
  },
  {
    symbol: "AXS",
    icon: "https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png",
    name: "Axie infinity shared",
    address: "0x97a9107C1793BC407d6F527b77e7fff4D812bece"
  },
  {
    symbol: "WRON",
    icon: "https://assets.coingecko.com/coins/images/20009/small/ronin.jpg",
    name: "Wrapped ronin",
    address: "0xe514d9DEB7966c8BE0ca922de8a064264eA6bcd4"
  },
  {
    symbol: "USDC",
    icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    name: "USD Coin",
    address: "0x0B7007c13325C48911F73A2daD5FA5dCBf808aDc"
  },
];

export { defaults, assetsIcons, tokensList };
