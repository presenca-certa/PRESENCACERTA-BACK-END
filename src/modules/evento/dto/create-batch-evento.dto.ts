import {
    IsNotEmpty,
    IsString,
    IsDate,
    IsInt,
    IsArray,
    IsOptional,
} from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateBatchEventoDto {
    @IsNotEmpty({ message: "nome é obrigatório" })
    @IsString({ message: "nome deve ser uma string" })
    nome: string;

    @IsNotEmpty({ message: "data inicial é obrigatória" })
    @IsDate({ message: "data inicial deve ser do tipo Date" })
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    dataInicio: Date;

    @IsNotEmpty({ message: "data final é obrigatória" })
    @IsDate({ message: "data final deve ser do tipo Date" })
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    dataFim: Date;

    @IsNotEmpty({ message: "dia da semana é obrigatório" })
    @IsInt({
        message:
            "dia da semana deve ser um número inteiro (1-5 para dias úteis)",
    })
    dayOfWeek: number; // 1 = Segunda, 2 = Terça, ..., 5 = Sexta

    @IsNotEmpty({ message: "hora de início é obrigatória" })
    @IsDate({ message: "hora de início deve ser do tipo Date" })
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    horaInicio: Date;

    @IsNotEmpty({ message: "hora de término é obrigatória" })
    @IsDate({ message: "hora de término deve ser do tipo Date" })
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    horaFim: Date;

    @IsOptional()
    @IsArray({ message: "turmas deve ser um array" })
    @IsInt({
        each: true,
        message: "cada turmaId deve ser um número inteiro",
    })
    turmas?: number[];

    @IsOptional()
    @IsInt({ message: "materiaId deve ser um número inteiro" })
    materiaId?: number;

    @IsOptional()
    @IsInt({ message: "tipoId deve ser um número inteiro" })
    tipoId?: number;

    @IsOptional()
    @IsInt({ message: "localId deve ser um número inteiro" })
    localId?: number;
}
