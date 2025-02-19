/*
  Warnings:

  - You are about to alter the column `title` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `RentedProductDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchaseDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RentedProductDetails" DROP CONSTRAINT "RentedProductDetails_productId_fkey";

-- DropForeignKey
ALTER TABLE "RentedProductDetails" DROP CONSTRAINT "RentedProductDetails_rentedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "purchaseDetails" DROP CONSTRAINT "purchaseDetails_productId_fkey";

-- DropForeignKey
ALTER TABLE "purchaseDetails" DROP CONSTRAINT "purchaseDetails_purchasedByUserId_fkey";

-- DropIndex
DROP INDEX "products_title_key";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "RentedProductDetails";

-- DropTable
DROP TABLE "purchaseDetails";

-- CreateTable
CREATE TABLE "rental_product_records" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rentedOn" TIMESTAMP(3) NOT NULL,
    "rentedTill" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "rentedByUserId" TEXT NOT NULL,

    CONSTRAINT "rental_product_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_product_records" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "purchasedByUserId" TEXT NOT NULL,

    CONSTRAINT "purchase_product_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchase_product_records_productId_key" ON "purchase_product_records"("productId");

-- AddForeignKey
ALTER TABLE "rental_product_records" ADD CONSTRAINT "rental_product_records_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_product_records" ADD CONSTRAINT "rental_product_records_rentedByUserId_fkey" FOREIGN KEY ("rentedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_product_records" ADD CONSTRAINT "purchase_product_records_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_product_records" ADD CONSTRAINT "purchase_product_records_purchasedByUserId_fkey" FOREIGN KEY ("purchasedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
