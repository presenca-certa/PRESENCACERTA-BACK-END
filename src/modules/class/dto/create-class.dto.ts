import { IsOptional, IsInt, IsString, IsNotEmpty } from "class-validator";

import { IClass } from "src/shared/interfaces/class.interface";

export class CreateClassDto implements IClass {
    @IsNotEmpty({ message: "nome é obrigatório" })
    @IsString({ message: "nome deve ser uma string" })
    nome: string;

    @IsNotEmpty({ message: "unidadeId é obrigatório" })
    @IsInt({ message: "unidadeId deve ser um número inteiro" })
    unidadeId: number;
}
