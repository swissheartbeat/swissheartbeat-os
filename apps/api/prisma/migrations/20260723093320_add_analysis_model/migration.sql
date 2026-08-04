-- AlterTable
ALTER TABLE "public"."Signal" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."Analysis" (
    "id" TEXT NOT NULL,
    "signalId" TEXT NOT NULL,
    "sourceCount" INTEGER NOT NULL DEFAULT 0,
    "credibility" DOUBLE PRECISION,
    "contradictions" INTEGER NOT NULL DEFAULT 0,
    "consensus" DOUBLE PRECISION,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_signalId_key" ON "public"."Analysis"("signalId");

-- AddForeignKey
ALTER TABLE "public"."Analysis" ADD CONSTRAINT "Analysis_signalId_fkey" FOREIGN KEY ("signalId") REFERENCES "public"."Signal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
