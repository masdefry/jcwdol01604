"use client";
import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from './Avatar';
import MenuItem from './MenuItem';
import RegisterModal from '@/components/Modals/RegisterModal';
import useRegisterModal from '@/app/hooks/useRegister';

import useRentModal from '@/app/hooks/useRent';

// interface UserMenuProps {
//     currentUser?: safeUser | null
// }

const UserMenu = () => {
    const RegisterModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);
    const rentModal = useRentModal()

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const onRent = useCallback(() => {
        // if(!currentuser){

        // }
        rentModal.onOpen();
    }, [rentModal]);
    console.log(onRent)

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>

                <div
                    onClick={onRent}
                    className='
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100t
                transition
                cursor-pointer
                '
                >
                    Jadi Tenant
                </div>

                <div
                    onClick={toggleOpen}
                    className='
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                '
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>

            </div>
            {isOpen && (
                <div
                    className='
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                '
                >
                    <div className='flex flex-col cursor-pointer'>
                        <>
                            <MenuItem
                                onClick={() => { }}
                                label='Login'
                            />
                            <MenuItem
                                onClick={RegisterModal.onOpen}
                                label='Sign Up'
                            />
                        </>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserMenu