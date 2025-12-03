import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClassModule } from "./modules/class/class.module";
import { UnidadeModule } from "./modules/unidade/unidade.module";
import { PeopleModule } from "./modules/people/people.module";
import { UserModule } from "./modules/user/user.module";
import MateriaModule from "./modules/materia/materia.module";
import EventoModule from "./modules/evento/evento.module";
import PresencaModule from "./modules/presenca/presenca.module";
import { LocalizacaoModule } from "./modules/localizacao/localizacao.module";

@Module({
    imports: [
        MateriaModule,
        UserModule,
        PeopleModule,
        ClassModule,
        EventoModule,
        PresencaModule,
        UnidadeModule,
        LocalizacaoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
