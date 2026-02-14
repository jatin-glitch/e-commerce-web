import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Serve static images from the Images folder
router.use('/Images', express.static(path.join(__dirname, '../../Images')));

export default router;
