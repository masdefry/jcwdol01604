"use client";
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Logo = () => {
    // const router = useRouter();

    return (
        // <Image
        //     alt="logo"
        //     className='hidden md:block cursor-pointer'
        //     height="100"
        //     width="100"
        //     src=""
        // />  download logo 

        <Link
            className='hidden md:block cursor-pointer'
            // onClick={() => router.push('/')}
            href={'/'}
        >
            Logo
        </Link>
    )
}

export default Logo