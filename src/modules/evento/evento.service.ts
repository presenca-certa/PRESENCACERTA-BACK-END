import { Injectable, BadRequestException } from "@nestjs/common";
import EventoRepository from "./evento.repository";
import CreateEventoDto from "./dto/create-evento.dto";
import UpdateEventoDto from "./dto/update-evento.dto";
import { CreateBatchEventoDto } from "./dto/create-batch-evento.dto";
import PresencaRepository from "../presenca/presenca.repository";
import { BatchDateUtil } from "src/shared/utils/batch-date.util";

@Injectable()
export default class EventoService {
    constructor(
        private readonly eventoRepository: EventoRepository,
        private readonly presencaRepository: PresencaRepository,
    ) {}

    async create(createEventoDto: CreateEventoDto) {
        const evento = await this.eventoRepository.create(createEventoDto);

        for (const turmaId of createEventoDto.turmas) {
            await this.eventoRepository.vinculaTurma(evento.id, turmaId);
        }

        return evento;
    }

    async createBatch(createBatchEventoDto: CreateBatchEventoDto) {
        // Validar o dia da semana
        if (!BatchDateUtil.isValidWeekday(createBatchEventoDto.dayOfWeek)) {
            throw new BadRequestException(
                "dayOfWeek deve estar entre 1 e 5 (dias úteis)",
            );
        }

        // Validar se data inicial é antes da data final
        if (createBatchEventoDto.dataInicio > createBatchEventoDto.dataFim) {
            throw new BadRequestException(
                "dataInicio deve ser anterior a dataFim",
            );
        }

        // Gerar as datas usando o utilitário
        const generatedDates = BatchDateUtil.generateBatchDates({
            startDate: createBatchEventoDto.dataInicio,
            endDate: createBatchEventoDto.dataFim,
            dayOfWeek: createBatchEventoDto.dayOfWeek,
        });

        if (generatedDates.length === 0) {
            throw new BadRequestException(
                "Nenhuma data foi gerada para o intervalo e dia da semana selecionados",
            );
        }

        // Criar eventos para cada data gerada
        const createdEventos = [];
        for (const generatedDate of generatedDates) {
            const eventData: CreateEventoDto = {
                nome: createBatchEventoDto.nome,
                dataInicio: generatedDate.date,
                dataFim: generatedDate.date,
                horaInicio: createBatchEventoDto.horaInicio,
                horaFim: createBatchEventoDto.horaFim,
                tipoId: createBatchEventoDto.tipoId,
                localId: createBatchEventoDto.localId,
                materiaId: createBatchEventoDto.materiaId,
                turmas: createBatchEventoDto.turmas,
            };

            const evento = await this.eventoRepository.create(eventData);

            // Vincular turmas
            if (
                createBatchEventoDto.turmas &&
                createBatchEventoDto.turmas.length > 0
            ) {
                for (const turmaId of createBatchEventoDto.turmas) {
                    await this.eventoRepository.vinculaTurma(
                        evento.id,
                        turmaId,
                    );
                }
            }

            createdEventos.push(evento);
        }

        return {
            message: `${createdEventos.length} eventos criados com sucesso`,
            eventosCount: createdEventos.length,
            datesGenerated: generatedDates.length,
            eventos: createdEventos,
        };
    }

    findAll() {
        return this.eventoRepository.findAll();
    }

    findOne(id: number) {
        return this.eventoRepository.findOneById(id);
    }

    findPresencasByTurma(id: number, turmaId: number) {
        return this.presencaRepository.findPresencasByTurma(id, turmaId);
    }

    update(id: number, updateEventoDto: UpdateEventoDto) {
        return this.eventoRepository.update(id, updateEventoDto);
    }

    remove(id: number) {
        return this.eventoRepository.remove(id);
    }
}
