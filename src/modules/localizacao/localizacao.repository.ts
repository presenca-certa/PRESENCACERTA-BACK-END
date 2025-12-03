import { Prisma, PrismaClient } from "@prisma/client";
import DatabaseService from "src/database/database.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";

export interface CreateLocalizacaoDto {
    latitude: number;
    longitude: number;
    raio?: number;
    descricao?: string;
}

export interface UpdateLocalizacaoDto {
    latitude?: number;
    longitude?: number;
    raio?: number;
    descricao?: string;
}

export default class LocalizacaoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = DatabaseService.getInstance();
    }

    async create(data: CreateLocalizacaoDto) {
        try {
            const localizacao = await this.prisma.localizacao.create({
                data: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    raio: data.raio ?? 50,
                    descricao: data.descricao,
                },
            });

            return localizacao;
        } catch (error) {
            throw new BadRequestException("Erro ao criar localização");
        }
    }

    async findAll() {
        return this.prisma.localizacao.findMany();
    }

    async findOneById(id: number) {
        const localizacao = await this.prisma.localizacao.findUnique({
            where: { id },
        });

        if (!localizacao) {
            throw new NotFoundException("Localização não encontrada");
        }

        return localizacao;
    }

    async update(id: number, data: UpdateLocalizacaoDto) {
        try {
            const localizacao = await this.prisma.localizacao.update({
                where: { id },
                data: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    raio: data.raio,
                    descricao: data.descricao,
                },
            });

            return localizacao;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("Localização não encontrada");
            }

            throw error;
        }
    }

    async remove(id: number) {
        try {
            const localizacao = await this.prisma.localizacao.delete({
                where: { id },
            });

            return localizacao;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw new NotFoundException("Localização não encontrada");
            }

            throw error;
        }
    }
}
