// src/controllers/propertyController.ts
import { Request, Response } from 'express';
import prisma from '@/prisma';

export const getAllProperties = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Ambil semua properti yang belum dihapus
        const properties = await prisma.property.findMany({
            where: {
                isDeleted: false,
            },
            include: {
                tenant: {
                    // Mengembalikan data tenant secara terbatas
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                category: true, // Ambil data kategori properti
                rooms: true,    // Ambil data kamar
                reviews: {
                    include: {
                        user: {     // Sertakan data user yang memberi review
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller untuk mengambil properti berdasarkan kategori (berdasarkan nama kategori)
export const getPropertiesByCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Ambil nama kategori dari query parameter, misalnya: /api/properties/category?category=Villa
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: 'Parameter category diperlukan' });
        }

        // Cari kategori berdasarkan nama di model PropertyCategory
        const categoryData = await prisma.propertyCategory.findFirst({
            where: {
                name: String(category), // Konversi ke string
            },
        });

        if (!categoryData) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }

        // Gunakan categoryId dari hasil pencarian kategori
        const properties = await prisma.property.findMany({
            where: {
                isDeleted: false,
                categoryId: categoryData.id, // Ambil ID dari kategori yang ditemukan
            },
            include: {
                tenant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                category: true, // Menyertakan informasi kategori
                rooms: true,    // Menyertakan kamar
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties by category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};