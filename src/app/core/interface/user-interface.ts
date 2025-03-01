export interface UserSaveRequestDTO {
  username: string;
  firstname: string;
  lastname: string;
  identification: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: string;
}

export interface AuthRequestDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
}
