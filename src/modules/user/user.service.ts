import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { HashUtil } from "src/shared/utils/hash.util";
import UserRepository from "./user.repository";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDTO: CreateUserDTO) {
        const hashedPassword = await HashUtil.hashPassword(
            createUserDTO.password,
        );
        createUserDTO.password = hashedPassword;

        return this.userRepository.create(createUserDTO);
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findByEmail(loginDto.email);

        const passwordMatch = await HashUtil.comparePassword(
            loginDto.password,
            user.senha,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException("Email ou senha incorretos");
        }

        return {
            id: user.id,
            email: user.email,
            nome: user.nome,
            role: user.role,
            message: "Login realizado com sucesso",
        };
    }

    findAll() {
        return this.userRepository.findAll();
    }

    findOneById(id: number) {
        return this.userRepository.findOneById(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const hashedPassword = await HashUtil.hashPassword(
            updateUserDto.password,
        );
        updateUserDto.password = hashedPassword;

        return this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.userRepository.remove(id);
    }
}
