import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
} from "class-validator";
import { IUser } from "src/shared/interfaces/user.interface";

export class CreateUserDTO implements IUser {
    @IsNotEmpty({ message: "email é obrigatório" })
    @IsString({ message: "email deve ser uma string" })
    @IsEmail({}, { message: "email deve ser válido" })
    email: string;

    @IsNotEmpty({ message: "senha é obrigatória" })
    @IsString({ message: "senha deve ser uma string" })
    @MinLength(8, { message: "senha deve ter no mínimo 8 caracteres" })
    password: string;

    @IsOptional()
    @IsString({ message: "nome deve ser uma string" })
    nome?: string;

    @IsOptional()
    @IsString({ message: "role deve ser uma string" })
    role?: string;
}
