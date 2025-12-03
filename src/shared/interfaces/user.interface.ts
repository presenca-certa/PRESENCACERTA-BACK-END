export interface IUser {
    id?: number;
    email: string;
    password: string;
    nome?: string;
    role?: string;
    ativo?: boolean;
    criadoEm?: Date;
}
