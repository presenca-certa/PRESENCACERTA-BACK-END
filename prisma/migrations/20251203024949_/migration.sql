/*
  Warnings:

  - You are about to drop the column `altitude` on the `Localizacao` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `Localizacao` table without a default value. This is not possible if the table is not empty.
  - Made the column `latitude` on table `Localizacao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Localizacao" DROP COLUMN "altitude",
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "raio" DOUBLE PRECISION NOT NULL DEFAULT 50,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Presenca" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "localizacaoId" INTEGER,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_localizacaoId_fkey" FOREIGN KEY ("localizacaoId") REFERENCES "Localizacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
