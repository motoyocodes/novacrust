export type pageType = 1 | 2 | 3 | 4 | 5;

export interface Token {
  id: string;
  code: string;
  name: string;
  network?: string;
  icon: React.ReactNode;
}

export interface WalletOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}
export type RecipientPage = 1 | 2 | 3 | 4;
