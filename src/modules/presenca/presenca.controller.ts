import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import PresencaService from "./presenca.service";
import CreatePresencaDto from "./dto/create-presenca.dto";
import UpdatePresencaDto from "./dto/update-presenca.dto";

@Controller("presenca")
export default class PresencaController {
    constructor(private readonly presencaService: PresencaService) {}

    @Post()
    create(@Body() createPresencaDto: CreatePresencaDto) {
        return this.presencaService.create(createPresencaDto);
    }

    @Get()
    findAll(@Query("eventoId") eventoId?: string) {
        if (eventoId) {
            return this.presencaService.findByEvento(Number(eventoId));
        }
        return this.presencaService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.presencaService.findOne(Number(id));
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updatePresencaDto: UpdatePresencaDto,
    ) {
        return this.presencaService.update(Number(id), updatePresencaDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.presencaService.remove(Number(id));
    }
}
