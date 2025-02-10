// src/routes/propertyRoutes.ts
import { Router } from 'express';
import { getAllProperties, getPropertiesByCategory } from '@/controllers/get-property.controller';

const router = Router();

router.get('/properties', getAllProperties);
router.get('/properties/category', getPropertiesByCategory);

export default router;