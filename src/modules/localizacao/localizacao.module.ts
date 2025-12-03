import { Module } from "@nestjs/common";
import { LocalizacaoController } from "./localizacao.controller";
import { LocalizacaoService } from "./localizacao.service";
import LocalizacaoRepository from "./localizacao.repository";

@Module({
    controllers: [LocalizacaoController],
    providers: [LocalizacaoService, LocalizacaoRepository],
    exports: [LocalizacaoService],
})
export class LocalizacaoModule {}
