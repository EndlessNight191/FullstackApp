interface TokenConfig {
  secret: string,
  expiration: number
}

export interface TokensConfig {
  access: TokenConfig,
  refresh: TokenConfig
}

export interface Tokens {
  accessToken: string,
  refreshToken: string
}

export interface DecodedToken {
  userId: number,
  login: string,
  role: string
}
