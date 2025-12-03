import { Injectable } from "@nestjs/common";
import LocalizacaoRepository, {
    CreateLocalizacaoDto,
    UpdateLocalizacaoDto,
} from "./localizacao.repository";
import {
    GeolocationUtil,
    GeoLocationValidation,
} from "src/shared/utils/geolocation.util";

@Injectable()
export class LocalizacaoService {
    constructor(
        private readonly localizacaoRepository: LocalizacaoRepository,
    ) {}

    async create(data: CreateLocalizacaoDto) {
        return this.localizacaoRepository.create(data);
    }

    async findAll() {
        return this.localizacaoRepository.findAll();
    }

    async findOne(id: number) {
        return this.localizacaoRepository.findOneById(id);
    }

    async update(id: number, data: UpdateLocalizacaoDto) {
        return this.localizacaoRepository.update(id, data);
    }

    async remove(id: number) {
        return this.localizacaoRepository.remove(id);
    }

    async validateLocation(
        userLatitude: number,
        userLongitude: number,
        localizacaoId: number,
    ): Promise<GeoLocationValidation> {
        const localizacao =
            await this.localizacaoRepository.findOneById(localizacaoId);

        return GeolocationUtil.validateLocation(
            userLatitude,
            userLongitude,
            localizacao.latitude,
            localizacao.longitude,
            localizacao.raio,
        );
    }
}
