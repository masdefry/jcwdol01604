
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Prevent leaflet errors on SSR
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
    //@ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconUrl: markerIcon.src,
        iconRetinaUrl: markerIcon2x.src,
        shadowUrl: markerShadow.src
    });
}

interface MapProps {
    center?: number[];
}

const Map2: React.FC<MapProps> = ({ center }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Hindari masalah render awal di SSR

    return (
        <MapContainer
            center={center as L.LatLngExpression || [51, -0.9]} //default value map
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className='h-[35vh] rounded-lg'
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && <Marker position={center as L.LatLngExpression} />}
        </MapContainer>
    );
};

export default Map2;
