export interface BatchDateRange {
    startDate: Date;
    endDate: Date;
    dayOfWeek: number; // 0 = Domingo, 1 = Segunda, etc.
}

export interface GeneratedDate {
    date: Date;
    dayOfWeek: number;
    dayName: string;
    isWeekday: boolean;
}

export class BatchDateUtil {
    private static readonly DAY_NAMES = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ];

    /**
     * Verifica se uma data é dia útil (segunda a sexta)
     */
    static isWeekday(date: Date): boolean {
        const dayOfWeek = date.getDay();
        return dayOfWeek >= 1 && dayOfWeek <= 5;
    }

    /**
     * Obtém o nome do dia da semana em português
     */
    static getDayName(date: Date): string {
        return this.DAY_NAMES[date.getDay()];
    }

    /**
     * Gera datas em lote seguindo as regras:
     * - Respeita o intervalo de datas
     * - Respeita o dia da semana selecionado
     * - Considera apenas dias úteis (segunda a sexta)
     */
    static generateBatchDates(config: BatchDateRange): GeneratedDate[] {
        const generatedDates: GeneratedDate[] = [];
        const currentDate = new Date(config.startDate);
        currentDate.setHours(0, 0, 0, 0);

        const endDate = new Date(config.endDate);
        endDate.setHours(23, 59, 59, 999);

        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();

            // Se o dia atual é o dia da semana selecionado
            if (dayOfWeek === config.dayOfWeek) {
                // E é um dia útil
                if (this.isWeekday(currentDate)) {
                    generatedDates.push({
                        date: new Date(currentDate),
                        dayOfWeek,
                        dayName: this.getDayName(currentDate),
                        isWeekday: true,
                    });
                }
            }

            // Avança para o próximo dia
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return generatedDates;
    }

    /**
     * Valida se um dia da semana é válido (1-5 para dias úteis)
     */
    static isValidWeekday(dayOfWeek: number): boolean {
        return dayOfWeek >= 1 && dayOfWeek <= 5;
    }

    /**
     * Converte nome do dia para número
     */
    static dayNameToNumber(dayName: string): number | null {
        const index = this.DAY_NAMES.findIndex(
            (name) => name.toLowerCase() === dayName.toLowerCase(),
        );
        return index !== -1 ? index : null;
    }
}
