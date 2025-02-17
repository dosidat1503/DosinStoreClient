export interface PanelProps {
  setIsSignInPage: (isSignInPage: boolean) => void;
}

export interface SignUpResponse {
  validation_errors?: validate;
  status?: number;
}

interface validate {
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
}

export interface SignUpBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  role: string;
  adminVerify: number;
}

export interface SignUpInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "";
}

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  status?: number;
  email?: string;
  matk?: number;
  access_token: string;
  refresh_token: string;
  message?: string;
  validation_errors: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  expires_in_AccessToken: number;
  expires_in_RefreshToken: number;
}

export interface RecoverPasswordBody {
  email: string;
}

export interface RecoverPasswordResponse {
  status: number;
  validation_errors: string;
}

export interface SignInInfo {
  email: string;
  password: string;
}

export interface Tokens {
  token: string;
  // expiresIn: number;
  type: string;
}
