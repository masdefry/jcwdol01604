"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/layouts/Container";
import axiosInstance from "@/lib/AxiosInstance";
import ListingHead from "@/components/Listing/ListingHead";
import ListingInfo from "@/components/Listing/ListingInfo";
import { categories } from "@/components/CategoryBox/Categories";

import { usePathname } from "next/navigation";
import ClientCompopnent from "@/layouts/ClientComponent";
// import Map2 from "@/utils/Map2";

import dynamic from "next/dynamic";

// Ganti import biasa dengan dynamic import:
const Map2 = dynamic(() => import("@/utils/Map2"), {
    ssr: false,         // pastikan di-disable SSR
});

interface Property {
    id: string;
    name: string;
    description: string;
    location: string;
    basePrice: number;
    category: string;
    tenant: { id: number; name: string; email: string, role: string; };
    rooms: { id: number; name: string; maxGuests: number }[];
    imageUrl: string;
    slug: string;
}

const ListingDetail = () => {
    const pathname = usePathname();
    // pathname = "/property/villa-cozy-bali"
    // Kita perlu "slug" = "villa-cozy-bali"

    // potong substring
    // const slug = pathname?.split("/")[2];
    const { propertyId } = useParams(); 
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const slug = pathname?.split("/")[2];
        if (!slug) return;

        const fetchProperty = async () => {
            try {
                setLoading(true);
                
                const { data } = await axiosInstance.get(`/property/slug/${slug}`);
                setProperty(data);
            } catch (error) {
                console.error("Error fetching property detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [pathname]);

    if (loading) {
        return <p className="text-center text-lg font-semibold py-8">Loading...</p>;
    }

    if (!property) {
        return <p className="text-center text-lg font-semibold py-8">Properti tidak ditemukan.</p>;
    }

   
    const category = categories.find((item) => item.label === property.category);

    return (
        <ClientCompopnent>
            <Container>
                <div className="max-w-screen-lg mx-auto">
                    <div className="flex flex-col gap-6">
                        <ListingHead
                            title={property.name}
                            imageSrc={property.imageUrl || "/default.avif"}
                            locationValue={property.location}
                            id={property.id}
                            currentUser={null} // Jika ada user yang login, bisa diambil dari auth store
                        />
                        <ListingInfo
                            user={property.tenant} 
                            category={category}
                            description={property.description}
                            roomCount={property.rooms.length}
                            guestCount={property.rooms.reduce((acc, room) => acc + room.maxGuests, 0)}
                            locationValue={property.location}
                            bathroomCount={property.rooms.length}
                        />
                        <Map2 />
                    </div>
                </div>
            </Container>
        </ClientCompopnent>

    );
};

export default ListingDetail;
