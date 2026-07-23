/*
  Warnings:

  - The `status` column on the `Signal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."SignalStatus" AS ENUM ('NEW', 'COLLECTING', 'VERIFIED', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "public"."Signal" DROP COLUMN "status",
ADD COLUMN     "status" "public"."SignalStatus" NOT NULL DEFAULT 'NEW';
