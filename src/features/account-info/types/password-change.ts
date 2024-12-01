export interface PasswordChangeBody {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  matk: string | null;
}

export interface PasswordChangeResponse {
  validation_errors?: string;
  status?: number;
}

export interface PasswordChangeInfo {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  matk: string | null;
}
