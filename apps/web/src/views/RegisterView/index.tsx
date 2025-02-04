'use client';
import ClientCompopnent from '@/layouts/ClientComponent';
import React from 'react'
import RegisterForm from './Components/RegisForm';
import Container from '@/layouts/Container';


export default function RegisView() {
    return (
        <ClientCompopnent>
            <Container>
                <RegisterForm />
            </Container>
        </ClientCompopnent>
    )
}