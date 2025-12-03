import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { LocalizacaoService } from "./localizacao.service";
import {
    CreateLocalizacaoDto,
    UpdateLocalizacaoDto,
} from "./localizacao.repository";

export interface ValidateLocationDto {
    userLatitude: number;
    userLongitude: number;
}

@Controller("localizacao")
export class LocalizacaoController {
    constructor(private readonly localizacaoService: LocalizacaoService) {}

    @Post()
    async create(@Body() data: CreateLocalizacaoDto) {
        return this.localizacaoService.create(data);
    }

    @Get()
    async findAll() {
        return this.localizacaoService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.localizacaoService.findOne(Number(id));
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() data: UpdateLocalizacaoDto) {
        return this.localizacaoService.update(Number(id), data);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.localizacaoService.remove(Number(id));
    }

    @Post(":id/validate")
    async validateLocation(
        @Param("id") id: string,
        @Body() data: ValidateLocationDto,
    ) {
        return this.localizacaoService.validateLocation(
            data.userLatitude,
            data.userLongitude,
            Number(id),
        );
    }
}
