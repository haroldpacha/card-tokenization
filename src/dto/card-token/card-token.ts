export type CreateCardTokenDto = {
  token?: string;
  card_number: string;
  cvv: string;
  expiration_year: string;
  expiration_month: string;
  email: string;
};

export type CardTokenDto = {
  token: string;
  card_number: string;
  cvv: string;
  expiration_year: string;
  expiration_month: string;
  email: string;
};

export type NewCardTokenDto = {
  card_number: string;
  cvv: string;
  expiration_year: string;
  expiration_month: string;
  email: string;
};

export type PublicCardTokenDto = Omit<CardTokenDto, 'cvv'>;
//export type CardTokenListDto = Pick<CardToken, 'token' | 'cvv'>;