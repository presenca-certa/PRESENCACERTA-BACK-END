import { Type } from "class-transformer";
import { ValidateNested, IsArray, ArrayMinSize } from "class-validator";
import CreateEventoDto from "./create-evento.dto";

export class CreateEventoLoteDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateEventoDto)
    eventos: CreateEventoDto[];
}
