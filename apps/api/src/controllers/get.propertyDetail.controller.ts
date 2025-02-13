import { Request, Response } from "express";
import prisma from "@/prisma";

export const getPropertyDetails = async (req: Request, res: Response) => {
    try {
        const { propertyId } = req.params;

        if (!propertyId) {
            return res.status(400).json({ message: "Property ID diperlukan" });
        }

        // Fetch Property dengan semua detailnya
        const property = await prisma.property.findUnique({
            where: { id: parseInt(propertyId) },
            include: {
                category: true, // Kategori Properti (Apartment, Villa, dll)
                tenant: {
                    select: { id: true, name: true, email: true }, // Informasi Pemilik Properti
                },
                rooms: {
                    include: {
                        availability: true, // Ketersediaan kamar
                        peakSeasonRates: true, // Harga khusus musim ramai
                    },
                },
                reviews: {
                    include: {
                        user: {
                            select: { name: true, profilePicture: true }, // Reviewer Info
                        },
                    },
                },
            },
        });

        if (!property) {
            return res.status(404).json({ message: "Properti tidak ditemukan" });
        }

        // Hitung rata-rata rating berdasarkan reviews
        const averageRating =
            property.reviews.length > 0
                ? property.reviews.reduce((acc, review) => acc + review.rating, 0) / property.reviews.length
                : null;

        res.json({
            id: property.id,
            name: property.name,
            description: property.description,
            location: `${property.location}, ${property.region}`,
            basePrice: property.basePrice,
            category: property.category.name,
            tenant: property.tenant,
            rooms: property.rooms.map((room) => ({
                id: room.id,
                name: room.name,
                description: room.description,
                price: room.price,
                maxGuests: room.maxGuests,
                availability: room.availability.map((av) => ({
                    date: av.date,
                    isAvailable: av.isAvailable,
                })),
                peakSeasonRates: room.peakSeasonRates.map((rate) => ({
                    startDate: rate.startDate,
                    endDate: rate.endDate,
                    priceAdjustment: rate.priceAdjustment,
                    percentageAdjustment: rate.percentageAdjustment,
                })),
            })),
            reviews: property.reviews.map((review) => ({
                id: review.id,
                user: review.user.name,
                profilePicture: review.user.profilePicture,
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
            })),
            averageRating,
        });
    } catch (error) {
        console.error("Error fetching property details:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil detail properti" });
    }
};
