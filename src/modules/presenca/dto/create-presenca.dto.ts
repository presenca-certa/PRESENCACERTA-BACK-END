import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { IPresenca } from "src/shared/interfaces/presenca.interface";

export default class CreatePresencaDto implements IPresenca {
    @IsNotEmpty({ message: "matrícula é obrigatória" })
    @IsString({ message: "matrícula deve ser uma string" })
    matricula: string;

    @IsNotEmpty({ message: "eventoId é obrigatório" })
    eventoId: number;

    @IsNotEmpty({ message: "dataPresenca é obrigatória" })
    @IsDate({ message: "dataPresenca deve ser do tipo Date" })
    @Type(() => Date)
    dataPresenca: Date;

    @IsNotEmpty({ message: "horaPresenca é obrigatória" })
    @IsDate({ message: "horaPresenca deve ser do tipo Date" })
    @Type(() => Date)
    horaPresenca: Date;

    @IsOptional()
    pessoaId?: number;

    @IsOptional()
    @IsNumber({}, { message: "latitude deve ser um número" })
    latitude?: number;

    @IsOptional()
    @IsNumber({}, { message: "longitude deve ser um número" })
    longitude?: number;

    @IsOptional()
    @IsNumber({}, { message: "localizacaoId deve ser um número" })
    localizacaoId?: number;
}
