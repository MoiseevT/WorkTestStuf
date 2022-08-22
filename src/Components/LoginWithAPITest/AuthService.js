import $api from "./index";
import {AxiosResponse} from "axios";

export interface IUser {
  userLogin: string,
  isActivated: boolean,
  id: string
}
export interface  AuthResponse {
  accessToken: string,
  refreshToken: string,
  user: IUser
}
export const AuthService = () => {
   async function login(userLogin: string, password: string): Promise<AxiosResponse<AuthResponse>> {
     return $api.post<AuthResponse>('/login', {userLogin, password})
  }
  async function logout(): Promise<void> {
    return $api.post('/logout')
  }
}