import ListingDetail from '@/components/Listing/ListingDetail'
import ClientCompopnent from '@/layouts/ClientComponent'
import React from 'react'

export default function page() {
    //diubah slugnya menjadi nama 
    //id jangan terekspose
    //nama hotel-id 
    //leaflet untuk map 
    return (
        <ClientCompopnent>
            <ListingDetail />
        </ClientCompopnent>
    )
}
