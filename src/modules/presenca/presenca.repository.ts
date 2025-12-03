import { Prisma, PrismaClient } from "@prisma/client";
import DatabaseService from "src/database/database.service";
import { NotFoundException } from "@nestjs/common";
import CreatePresencaDto from "./dto/create-presenca.dto";
import { IPresenca } from "src/shared/interfaces/presenca.interface";
import UpdatePresencaDto from "./dto/update-presenca.dto";

export default class PresencaRepository {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = DatabaseService.getInstance();
    }

    async create(presenca: CreatePresencaDto) {
        const createdPresenca = await this.prisma.presenca.create({
            data: {
                eventoId: presenca.eventoId,
                pessoaId: presenca.pessoaId,
                dataPresenca: presenca.dataPresenca,
                horaPresenca: presenca.horaPresenca,
                latitude: presenca.latitude,
                longitude: presenca.longitude,
                localizacaoId: presenca.localizacaoId,
            },
        });

        return createdPresenca;
    }

    async findAll() {
        const presencas: Partial<IPresenca>[] =
            await this.prisma.presenca.findMany({
                select: {
                    id: true,
                    dataPresenca: true,
                    horaPresenca: true,
                    latitude: true,
                    longitude: true,
                    evento: {
                        select: {
                            nome: true,
                        },
                    },
                    pessoa: {
                        select: {
                            nome: true,
                            codigo: true,
                        },
                    },
                },
            });

        return presencas;
    }

    async findOneById(id: number) {
        const presenca: Partial<IPresenca> =
            await this.prisma.presenca.findUnique({
                where: { id },
                select: {
                    dataPresenca: true,
                    horaPresenca: true,
                    latitude: true,
                    longitude: true,
                    evento: {
                        select: {
                            nome: true,
                        },
                    },
                    pessoa: {
                        select: {
                            nome: true,
                            codigo: true,
                        },
                    },
                },
            });

        if (!presenca) {
            throw new NotFoundException("Presença não encontrada");
        }

        return presenca;
    }

    async update(id: number, presenca: UpdatePresencaDto) {
        try {
            const updatedPresenca: IPresenca =
                await this.prisma.presenca.update({
                    where: { id },
                    data: {
                        eventoId: presenca.eventoId,
                        pessoaId: presenca.pessoaId,
                        dataPresenca: presenca.dataPresenca,
                        horaPresenca: presenca.horaPresenca,
                        latitude: presenca.latitude,
                        longitude: presenca.longitude,
                        localizacaoId: presenca.localizacaoId,
                    },
                });

            return updatedPresenca;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("Presença não encontrada");
            }
        }
    }

    async remove(id: number) {
        try {
            const deletedPresenca = await this.prisma.presenca.delete({
                where: { id },
            });

            return deletedPresenca;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("Presença não encontrada");
            }
        }
    }

    async findPresencaByEventoIdAndPessoaId(
        pessoaId: number,
        eventoId: number,
    ) {
        const presenca: Partial<IPresenca> =
            await this.prisma.presenca.findFirst({
                where: {
                    AND: {
                        eventoId: eventoId,
                        pessoaId: pessoaId,
                    },
                },
            });

        return presenca;
    }

    async findPresencasByTurma(id: number, turmaId: number) {
        const presencas = await this.prisma.presenca.findMany({
            where: {
                AND: {
                    eventoId: id,
                    pessoa: {
                        turmas: {
                            some: {
                                turmaId: turmaId,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                dataPresenca: true,
                horaPresenca: true,
                latitude: true,
                longitude: true,
                pessoa: {
                    select: {
                        id: true,
                        nome: true,
                        codigo: true,
                    },
                },
            },
        });

        return presencas;
    }
}
