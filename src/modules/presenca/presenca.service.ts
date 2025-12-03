import { ConflictException, Injectable } from "@nestjs/common";
import PresencaRepository from "./presenca.repository";
import CreatePresencaDto from "./dto/create-presenca.dto";
import UpdatePresencaDto from "./dto/update-presenca.dto";
import PeopleRepository from "../people/people.repository";

@Injectable()
export default class PresencaService {
    constructor(
        private readonly presencaRepository: PresencaRepository,
        private readonly pessoaRepository: PeopleRepository,
    ) {}

    async create(createPresencaDto: CreatePresencaDto) {
        const pessoa = await this.pessoaRepository.findByCode(
            createPresencaDto.matricula,
        );

        createPresencaDto.pessoaId = pessoa.id;

        const jaTemPresenca =
            await this.presencaRepository.findPresencaByEventoIdAndPessoaId(
                pessoa.id,
                createPresencaDto.eventoId,
            );

        if (jaTemPresenca) {
            throw new ConflictException(
                "Você já possui presença registrada nesse evento",
            );
        }

        return this.presencaRepository.create(createPresencaDto);
    }

    findAll() {
        return this.presencaRepository.findAll();
    }

    findOne(id: number) {
        return this.presencaRepository.findOneById(id);
    }

    findByEvento(eventoId: number) {
        return this.presencaRepository.findPresencasByEvento(eventoId);
    }

    update(id: number, updatePresencaDto: UpdatePresencaDto) {
        return this.presencaRepository.update(id, updatePresencaDto);
    }

    remove(id: number) {
        return this.presencaRepository.remove(id);
    }
}
