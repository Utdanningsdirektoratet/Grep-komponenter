export type UserMenuItem = {
  id: string;
  label: string;
  action?: () => void;
  isAnchor?: boolean;
  href?: string;
  onClick?: (e: any) => void;
};

export interface IAuthorizedPage {
  name: string;
  translatedTextRef?: string;
  accessTextRef?: string;
  redirectUrl?: string;
  path: string;
  exact?: boolean;
  link?: boolean;
  accessLink?: boolean;
}

export type v0colors = {
  body: string;
  headerBackgroundColor: string;
  borderColor: string;
  primaryFade: string;
  greyText: string;
  placeholderText: string;
  textColor: string;
  textColorFade: string;
  textColorMoreFade: string;
  white: string;
  lightGrey: string;
  primary: string;
  secondary: string;
};
