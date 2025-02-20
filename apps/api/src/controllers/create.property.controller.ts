// src/controllers/propertyController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

export const createPropertyListing = async (req: Request, res: Response) => {
    try {
        // Pastikan user telah terautentikasi dan merupakan tenant
        const user = req.user as { id: number; role: string };
        if (!user || user.role !== 'TENANT') {
            return res.status(403).json({ error: 'Hanya tenant yang dapat membuat listing properti.' });
        }

        // Ambil data dari request body
        const { name, categoryId, description, location, region, basePrice } = req.body;

        // Validasi input minimal
        if (!name || !categoryId || !basePrice) {
            return res.status(400).json({ error: 'Field "name", "categoryId", dan "basePrice" wajib diisi.' });
        }

        // Buat slug dari nama properti menggunakan library slugify
        const slug = slugify(name, { lower: true, strict: true });

        // Cek apakah properti dengan slug yang sama sudah ada
        const existingProperty = await prisma.property.findUnique({ where: { slug } });
        if (existingProperty) {
            return res.status(409).json({ error: 'Properti dengan nama yang sama sudah ada.' });
        }

        // Ambil URL gambar jika ada (dari Cloudinary)
        const imageUrl = req.file ? req.file.path : null;

        // Membuat properti baru menggunakan Prisma
        const newProperty = await prisma.property.create({
            data: {
                tenantId: user.id,
                name,
                slug,
                categoryId: Number(categoryId),
                description,
                location,
                region,
                basePrice: Number(basePrice),
                imageUrl, // Simpan URL gambar
            },
        });

        return res.status(201).json({
            message: 'Properti berhasil dibuat.',
            property: newProperty,
        });
    } catch (error) {
        console.error('Error createPropertyListing:', error);
        return res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
};
