"use client";

import React, { useRef } from 'react';
import { useFormikContext } from 'formik';
import Heading from '@/utils/Heading';
import Button from '@/utils/Button';

interface StepImagesProps {
    errors: any;
    touched: any;
}

const StepImages: React.FC<StepImagesProps> = ({ errors, touched }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { values, setFieldValue } = useFormikContext<{
        images: string[];
    }>();

    const handleSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        // Contoh: kita hanya menampung "fake URL" agar bisa preview
        // Nanti untuk upload sesungguhnya, bisa dilakukan di server
        const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
        setFieldValue('images', [...values.images, ...fileArray]);
    };

    return (
        <div className="flex flex-col gap-8">
            <Heading
                title="Tambahkan Foto"
                subtitle="Upload minimal 1 foto, Anda bisa menambahkan lebih banyak"
            />

            <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
            />

            <Button label="Tambah Foto" onClick={handleSelectFile} outline />

            {/* Preview Gambar */}
            <div className="grid grid-cols-3 gap-2 mt-4">
                {values.images.map((imgSrc, index) => (
                    <div key={index} className="relative h-24 w-24">
                        <img
                            src={imgSrc}
                            alt="preview"
                            className="object-cover w-full h-full rounded"
                        />
                    </div>
                ))}
            </div>

            {errors.images && touched.images && (
                <div className="text-red-500 text-sm">{errors.images}</div>
            )}
        </div>
    );
};

export default StepImages;
