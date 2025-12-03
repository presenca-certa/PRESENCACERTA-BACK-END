import * as bcrypt from "bcrypt";

export class HashUtil {
    public static async hashPassword(password: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(10);
        const hash: string = await bcrypt.hash(password, salt);

        return hash;
    }

    public static async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
