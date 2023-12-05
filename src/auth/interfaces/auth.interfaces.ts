export interface ITokenResponse {
    access_token: string
}
export interface ITokenUserRequest {
    user: {
        sub: string
        iat: number
        exp: number
    }
}