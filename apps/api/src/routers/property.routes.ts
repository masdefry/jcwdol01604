// src/routes/propertyRoutes.ts
import { Router } from 'express';
import { getAllProperties, getPropertiesByCategory } from '@/controllers/get-property.controller';
import { getPropertyDetails, getPropertyDetailsBySlug } from '@/controllers/get.propertyDetail.controller';
import { AdminGuard, VerifyToken } from '@/middlewares/log.niddleware';
import { createPropertyListing } from '@/controllers/create.property.controller';
import upload from '@/middlewares/upload';
import { SingleUploader } from '@/utils/uploader';
import { getPropertiesFilter } from '@/controllers/filter.controller';

const router = Router();

router.get('/properties', getAllProperties);
router.get('/properties/category', getPropertiesByCategory);
router.get("/:propertyId", getPropertyDetails);
router.get("/slug/:slug", getPropertyDetailsBySlug);

// router.post(
//     '/create',
//     VerifyToken,
//     AdminGuard,
//     upload.single('image'),
//     createPropertyListing
// )

router.post(
    '/create',
    VerifyToken,
    AdminGuard,
    SingleUploader("PROP","/property"),
    createPropertyListing
);

router.get('/filter', getPropertiesFilter)

export default router;