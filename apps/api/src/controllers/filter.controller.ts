import { Request, Response } from "express";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

export const searchProperties = async (req: Request, res: Response) => {
    try {
        const { location, region, startDate, endDate, numGuests, sortBy } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start date dan end date wajib diisi" });
        }

        // Konversi tanggal ke objek Date
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);
        const guests = numGuests ? parseInt(numGuests as string) : 1;

        // Cari properti berdasarkan lokasi dan region
        let properties = await prisma.property.findMany({
            where: {
                AND: [
                    location ? { location: { contains: location as string } } : {},
                    region ? { region: { contains: region as string } } : {},
                ],
            },
            include: {
                rooms: {
                    include: {
                        availability: {
                            where: {
                                date: { gte: start, lte: end },
                                isAvailable: true,
                            },
                        },
                    },
                },
            },
        });

        // Filter properti yang memiliki kamar sesuai jumlah tamu
        properties = properties.filter((property) =>
            property.rooms.some((room: Prisma.RoomGetPayload<{ include: { availability: true } }>) => room.maxGuests >= guests)
        );

        // Tandai properti yang tersedia/tidak tersedia
        properties = properties.map((property) => ({
            ...property,
            isAvailable: property.rooms.some((room: Prisma.RoomGetPayload<{ include: { availability: true } }>) => room.availability.length > 0),
        }));

        // Sorting harga termurah → termahal atau sebaliknya
        if (sortBy === "price_asc") {
            properties.sort((a, b) => a.basePrice - b.basePrice);
        } else if (sortBy === "price_desc") {
            properties.sort((a, b) => b.basePrice - a.basePrice);
        }

        res.json({ properties });
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mencari properti" });
    }
};
