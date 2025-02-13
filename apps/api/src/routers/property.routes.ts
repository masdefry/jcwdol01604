// src/routes/propertyRoutes.ts
import { Router } from 'express';
import { getAllProperties, getPropertiesByCategory } from '@/controllers/get-property.controller';
import { getPropertyDetails } from '@/controllers/get.propertyDetail.controller';

const router = Router();

router.get('/properties', getAllProperties);
router.get('/properties/category', getPropertiesByCategory);
router.get("/:propertyId", getPropertyDetails);

export default router;