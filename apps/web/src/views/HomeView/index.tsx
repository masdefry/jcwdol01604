"use client";
import Footer from '@/components/Footer';
import PropertyCard from '@/components/Properties/PropertyCard';
import ClientCompopnent from '@/layouts/ClientComponent';
import Container from '@/layouts/Container';
import axiosInstance from '@/lib/AxiosInstance';
import Carousel from '@/utils/Carousel';
import Empty from '@/utils/EmptyHandler';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

interface Property {
    id: number;
    name: string;
    location: string;
    basePrice: number;
    rating: number;
    imageUrl: string;
    reviews?: { rating: number }[]; // Bisa kosong jika tidak ada review
}


export default function HomeViews() {
    //emptyhandler
    // const isEmpty = true;
    const router = useRouter();

    const searchParams = useSearchParams();
    const category = searchParams.get("category"); // Ambil kategori dari URL

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Contoh array banner, pastikan gambar-gambar tersebut ada di folder public/images
    const bannerImages = [
        '/Banner1.avif',
        '/Banner2.avif',
        '/Banner3.avif',
    ];

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                let url = "/property/properties"; // Default: ambil semua properti
                if (category) {
                    url = `/property/properties/category?category=${category}`; // Fetch berdasarkan kategori jika ada
                }
                const response = await axiosInstance.get(url);
                setProperties(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [category]); // Fetch ulang saat kategori berubah
    console.log(properties);

    const isEmpty = !loading && properties.length === 0;


    if (isEmpty) {
        return (
            <ClientCompopnent>
                <Empty showReset />
            </ClientCompopnent>
        )
    }

    return (
        <ClientCompopnent>
            <Container>
                {/* Tampilkan Carousel di bagian atas */}
                <Carousel banners={bannerImages} />

                {loading ? (
                    <p className="text-center text-lg font-semibold py-8">Loading...</p>
                ) : (

                    <div
                        className="
                    pt-24
                    grid
                    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
                    gap-6
            "
                        >
                            {properties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    id={property.id}
                                    name={property.name}
                                    location={property.location}
                                    price={property.basePrice}
                                    rating={property.rating}
                                    imageUrl={property.imageUrl || "/default.avif"}
                                />
                            ))}
                        </div>
                )}
                {/* <Footer /> */}
            </Container>
        </ClientCompopnent>
    )
};
