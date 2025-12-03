import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "email é obrigatório" })
    @IsEmail({}, { message: "email deve ser válido" })
    email: string;

    @IsNotEmpty({ message: "senha é obrigatória" })
    @IsString({ message: "senha deve ser uma string" })
    @MinLength(8, { message: "senha deve ter no mínimo 8 caracteres" })
    password: string;
}
