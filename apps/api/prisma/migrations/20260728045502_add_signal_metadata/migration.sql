-- AlterTable
ALTER TABLE "public"."Signal" ADD COLUMN     "category" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3);
