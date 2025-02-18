-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS');

-- CreateEnum
CREATE TYPE "ProductAvailabilityStatus" AS ENUM ('AVAILABLE', 'SOLD', 'RENTED', 'PENDING_SALE');

-- CreateEnum
CREATE TYPE "ProductRentalPeriod" AS ENUM ('PER_HOUR', 'PER_DAY', 'PER_WEEK');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categories" "Category"[],
    "price" DECIMAL(10,2) NOT NULL,
    "rentalPrice" DECIMAL(10,2) NOT NULL,
    "rentalPeriod" "ProductRentalPeriod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,
    "productAvailability" "ProductAvailabilityStatus" NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchaseDetails" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "purchasedByUserId" TEXT NOT NULL,

    CONSTRAINT "purchaseDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedProductDetails" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rentedOn" TIMESTAMP(3),
    "rentedTill" TIMESTAMP(3),
    "productId" TEXT NOT NULL,
    "rentedByUserId" TEXT NOT NULL,

    CONSTRAINT "RentedProductDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");

-- CreateIndex
CREATE UNIQUE INDEX "purchaseDetails_productId_key" ON "purchaseDetails"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "purchaseDetails_purchasedByUserId_key" ON "purchaseDetails"("purchasedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "RentedProductDetails_productId_key" ON "RentedProductDetails"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "RentedProductDetails_rentedByUserId_key" ON "RentedProductDetails"("rentedByUserId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseDetails" ADD CONSTRAINT "purchaseDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseDetails" ADD CONSTRAINT "purchaseDetails_purchasedByUserId_fkey" FOREIGN KEY ("purchasedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedProductDetails" ADD CONSTRAINT "RentedProductDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedProductDetails" ADD CONSTRAINT "RentedProductDetails_rentedByUserId_fkey" FOREIGN KEY ("rentedByUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
