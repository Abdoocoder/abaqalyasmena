import { Router } from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import authenticate from '../middleware/auth.js'
import { Readable } from 'stream'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: resolve(__dirname, '..', '.env') })
}

const upload = multer({ storage: multer.memoryStorage() })

const router = Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.post('/', authenticate, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'abaqalyasmena',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
          transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
        },
        (err, result) => {
          if (err) reject(err)
          else resolve(result)
        },
      )
      uploadStream.on('error', reject)
      const bufferStream = Readable.from(req.file.buffer)
      bufferStream.on('error', reject)
      bufferStream.pipe(uploadStream)
    })

    res.json({ url: result.secure_url, secure_url: result.secure_url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
