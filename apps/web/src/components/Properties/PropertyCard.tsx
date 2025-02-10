"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface PropertyCardProps {
    id: number;
    name: string;
    location: string;
    price: number;
    distance?: number;
    rating: number;
    imageUrl: string;
    availableDates?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    name,
    location,
    price,
    rating,
    imageUrl,
    availableDates,
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:scale-105">
            {/* Gambar Properti */}
            <div className="relative w-full h-60">
                <Image
                    src={imageUrl}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>

            {/* Konten */}
            <div className="p-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-500 text-sm">{location}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    <FaStar />
                    <span className="text-sm font-medium">{rating}</span>
                </div>

                {/* Harga */}
                <p className="text-lg font-bold mt-2">Rp{price.toLocaleString()} / malam</p>
                {availableDates && <p className="text-sm text-gray-500">{availableDates}</p>}
            </div>
        </div>
    );
};

export default PropertyCard;