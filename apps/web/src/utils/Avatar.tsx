"use client";
import useAuthStore from '@/stores/AuthStores';
import Image from 'next/image';
import React from 'react'

const Avatar = () => {
    const { user, clearAuth } = useAuthStore(); //zustand
    
    return (
        <div>
            {/* <Image
            className='rounded-full'
            height="30"
            width="30"
            alt='Avatar'
            src="/image/"
            /> */}
            <span className="hidden md:inline-block font-medium">{user?.name || "Guest"}</span>
        </div>
    )
}

export default Avatar