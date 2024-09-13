export interface UpdatePass{
    id?: number;
    actuallyPassword:string;
    newPassword?: string;
    confirmPassword?: string;
    message?: string;
}  