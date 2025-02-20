"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/AxiosInstance";
import Empty from "@/utils/EmptyHandler";
import PropertyCard from "@/components/Properties/PropertyCard";

interface Property {
    id: number;
    name: string;
    location: string;
    basePrice: number;
    rating: number;
    imageUrl: string;
    slug: string;
    lowestRoomPrice?: number;
}

export default function SearchResult() {
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Ambil param2 pencarian
                const name = searchParams.get("name");
                const location = searchParams.get("location");
                const startDate = searchParams.get("startDate");
                const endDate = searchParams.get("endDate");
                const categoryId = searchParams.get("categoryId");
                const sort = searchParams.get("sort");

                // Bentuk query
                const query = new URLSearchParams();
                if (name) query.set("name", name);
                if (location) query.set("location", location);
                if (startDate) query.set("startDate", startDate);
                if (endDate) query.set("endDate", endDate);
                if (categoryId) query.set("categoryId", categoryId);
                if (sort) query.set("sort", sort);

                // Panggil backend /api/search
                const url = `/api/search?${query.toString()}`;
                const { data } = await axiosInstance.get(url);

                const results = data.data || [];
                setProperties(results);
            } catch (error) {
                console.error("Error fetching search result:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    if (loading) {
        return <p className="text-center text-lg font-semibold py-8">Loading...</p>;
    }

    if (properties.length === 0) {
        return <Empty showReset />;
    }

    // Tampilkan grid (seperti di home)
    return (
        <div
            className="
        pt-24
        grid
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 2xl:grid-cols-6
        gap-6
      "
        >
            {properties.map((property) => {
                const priceToDisplay = property.lowestRoomPrice ?? property.basePrice;
                return (
                    <PropertyCard
                        key={property.id}
                        id={property.id}
                        name={property.name}
                        location={property.location}
                        price={priceToDisplay}
                        rating={property.rating}
                        imageUrl={property.imageUrl || "/default.avif"}
                        slug={property.slug}
                    />
                );
            })}
        </div>
    );
}
