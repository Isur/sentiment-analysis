export interface RegisterState {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
}

export interface RegisterActionPayload {
  field: string,
  value: string,
}
