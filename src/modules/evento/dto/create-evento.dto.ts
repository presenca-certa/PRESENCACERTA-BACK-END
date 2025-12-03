import {
    IsDate,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";
import { IEvento } from "src/shared/interfaces/evento.interface";

export default class CreateEventoDto implements IEvento {
    @IsNotEmpty({ message: "campo nome é obrigatório" })
    @IsString({ message: "campo nome deve ser uma string" })
    nome: string;

    // @IsNotEmpty({ message: "o tipo do evento é obrigatório" })
    tipoId: number;

    // @IsDate({ message: "o campo data inicial deve ser do tipo Date" })
    @IsNotEmpty({ message: "a data inicial do evento é obrigatória" })
    dataInicio: Date;

    // @IsDate({ message: "o campo data final deve ser do tipo Date" })
    // @IsNotEmpty({ message: "a data final do evento é obrigatória" })
    dataFim: Date;

    // @IsDate({ message: "o campo hora inicio deve ser do tipo Date" })
    @IsNotEmpty({ message: "a hora inicio do evento é obrigatória" })
    horaInicio: Date;

    // @IsDate({ message: "o campo hora fim deve ser do tipo Date" })
    @IsNotEmpty({ message: "a hora fim do evento é obrigatória" })
    horaFim: Date;

    @IsOptional()
    @IsInt({ message: "materiaId deve ser um número inteiro" })
    materiaId?: number;

    turmas?: number[];

    localId?: number;
}
