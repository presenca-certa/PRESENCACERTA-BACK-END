import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import EventoService from "./evento.service";
import CreateEventoDto from "./dto/create-evento.dto";
import UpdateEventoDto from "./dto/update-evento.dto";
import { CreateBatchEventoDto } from "./dto/create-batch-evento.dto";

@Controller("evento")
export default class EventoController {
    constructor(private readonly eventoService: EventoService) {}

    @Post()
    create(@Body() createEventoDto: CreateEventoDto) {
        return this.eventoService.create(createEventoDto);
    }

    @Post("batch")
    createBatch(@Body() createBatchEventoDto: CreateBatchEventoDto) {
        return this.eventoService.createBatch(createBatchEventoDto);
    }

    @Get()
    findAll() {
        return this.eventoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.eventoService.findOne(Number(id));
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateEventoDto: UpdateEventoDto) {
        return this.eventoService.update(Number(id), updateEventoDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.eventoService.remove(Number(id));
    }

    @Get(":id/turma/:turmaId/presencas")
    findPresencasByTurma(
        @Param("id") id: string,
        @Param("turmaId") turmaId: string,
    ) {
        return this.eventoService.findPresencasByTurma(
            Number(id),
            Number(turmaId),
        );
    }
}
