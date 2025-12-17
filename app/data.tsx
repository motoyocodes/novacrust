import { Token, WalletOption } from "./types";
import celo from "../public/celo.png";
import usdtbnb from "../public/usdtbnb.png";
import usdtton from "../public/usdtton.png";
import eth from "../public/eth.png";
import metamask from "../public/eth.png";
import rainbow from "../public/rainbow.png";
import Vector from "../public/Vector.png";
import w from "../public/w.png";

export const Tokens: Token[] = [
  {
    id: "eth",
    code: "ETH",
    name: "Ethereum",
    icon: <img src={eth.src} alt="eth" />,
  },
  {
    id: "usdt-celo",
    code: "USDT",
    name: "Tether USD",
    network: "CELO",
    icon: <img src={celo.src} alt="celo" />,
  },
  {
    id: "usdt-ton",
    code: "USDT",
    name: "Tether USD",
    network: "TON",
    icon: <img src={usdtton.src} alt="usdtton" />,
  },
  {
    id: "usdt-bnb",
    code: "USDT",
    name: "Tether USD",
    network: "BNB",
    icon: <img src={usdtbnb.src} alt="usdtbnb" />,
  },
];

export const Wallets: WalletOption[] = [
  {
    id: "metamask",
    name: "Metamask",
    icon: <img src={metamask.src} alt="metamask" />,
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: <img src={rainbow.src} alt="rainbow" />,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: <img src={w.src} alt="wallet" />,
  },
  {
    id: "other",
    name: "Other Crypto Wallet",
    icon: <img src={Vector.src} alt="Vector" />,
  },
];

export const Banks = [
  "Access Bank",
  "GT Bank",
  "Zenith Bank",
  "UBA",
  "Kuda Microfinance",
];

export const currencies = [
  { code: "NGN", name: "Nigerian Naira", icon: "🇳🇬", rate: 1.0 },
  { code: "USD", name: "US Dollar", icon: "🇺🇸", rate: 1500 },
  { code: "GBP", name: "British Pound", icon: "🇬🇧", rate: 1900 },
  { code: "EUR", name: "Euro", icon: "🇪🇺", rate: 1650 },
];
