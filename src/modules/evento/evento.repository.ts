import { Prisma, PrismaClient } from "@prisma/client";
import DatabaseService from "src/database/database.service";
import { NotFoundException } from "@nestjs/common";
import CreateEventoDto from "./dto/create-evento.dto";
import { IEvento } from "src/shared/interfaces/evento.interface";
import UpdateEventoDto from "./dto/update-evento.dto";

export default class EventoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = DatabaseService.getInstance();
    }

    async create(evento: CreateEventoDto) {
        const createdEvento = await this.prisma.evento.create({
            data: {
                nome: evento.nome,
                dataInicio: evento.dataInicio,
                dataFim: evento.dataFim,
                horaInicio: evento.horaInicio,
                horaFim: evento.horaFim,
                localId: evento.localId,
            },
        });

        return createdEvento;
    }

    async findAll() {
        const eventos: Partial<IEvento>[] = await this.prisma.evento.findMany({
            select: {
                id: true,
                nome: true,
                dataInicio: true,
                dataFim: true,
                horaInicio: true,
                horaFim: true,
                localId: true,
            },
        });

        return eventos;
    }

    async findOneById(id: number) {
        const evento: Partial<IEvento> = await this.prisma.evento.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                dataInicio: true,
                dataFim: true,
                horaInicio: true,
                horaFim: true,
                localId: true,
                turmas: {
                    select: {
                        id: true,
                        turma: {
                            select: {
                                id: true,
                                nome: true,
                            },
                        },
                    },
                },
            },
        });

        if (!evento) {
            throw new NotFoundException("evento nao existe");
        }

        return evento;
    }

    async update(id: number, evento: UpdateEventoDto) {
        try {
            const updatedEvento: IEvento = await this.prisma.evento.update({
                where: { id },
                data: {
                    nome: evento.nome,
                    dataInicio: evento.dataInicio,
                    dataFim: evento.dataFim,
                    horaInicio: evento.horaInicio,
                    horaFim: evento.horaFim,
                    localId: evento.localId,
                },
            });

            return updatedEvento;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("evento nao existe");
            }
        }
    }

    async remove(id: number) {
        try {
            const deletedEvento = await this.prisma.evento.delete({
                where: { id },
            });

            return deletedEvento;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("evento nao existe");
            }
        }
    }

    async vinculaTurma(id: number, turmaId: number) {
        const createdEventoTurma = await this.prisma.eventoTurma.create({
            data: {
                eventoId: id,
                turmaId: turmaId,
            },
        });

        return createdEventoTurma;
    }
}
