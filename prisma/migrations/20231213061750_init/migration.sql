-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "ingredient" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "video_link" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);
