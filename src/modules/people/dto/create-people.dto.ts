import {
    IsString,
    IsOptional,
    IsInt,
    IsArray,
    IsNumberString,
} from "class-validator";

import { IPeople } from "src/shared/interfaces/people.interface";

export class CreatePeopleDto implements IPeople {
    @IsString({ message: "código deve ser uma string" })
    codigo: string;

    @IsString({ message: "nome deve ser uma string" })
    nome: string;

    @IsString({ message: "CPF deve ser uma string" })
    @IsOptional()
    @IsNumberString({}, { message: "CPF deve conter apenas números" })
    cpf?: string;

    @IsOptional()
    @IsInt({ message: "tipoId deve ser um número inteiro" })
    tipoId?: number;

    @IsOptional()
    @IsInt({ message: "unidadeId deve ser um número inteiro" })
    unidadeId?: number;

    @IsOptional()
    @IsInt({ message: "usuarioId deve ser um número inteiro" })
    usuarioId?: number;
}
