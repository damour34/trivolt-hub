-- CreateEnum
CREATE TYPE "InternshipTrack" AS ENUM ('networking_internet_tech', 'software_development', 'computer_systems_architecture');

-- CreateTable
CREATE TABLE "updates" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "university" TEXT NOT NULL,
    "year_of_study" TEXT NOT NULL,
    "track" "InternshipTrack" NOT NULL,
    "motivation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
