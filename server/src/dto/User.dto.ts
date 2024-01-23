export interface UserDto {
    _id: string,
    username: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string | null,
    lastLogin: string | null,
}