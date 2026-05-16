import { Router } from 'express'
import pool from '../db.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact LIMIT 1')
    if (result.rows.length === 0) {
      const inserted = await pool.query('INSERT INTO contact DEFAULT VALUES RETURNING *')
      return res.json(inserted.rows[0])
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/', authenticate, async (req, res) => {
  try {
    const { phone, whatsapp, address, address_ar, hours, hours_ar, facebook, maps_query } = req.body
    const result = await pool.query(
      'UPDATE contact SET phone=$1, whatsapp=$2, address=$3, address_ar=$4, hours=$5, hours_ar=$6, facebook=$7, maps_query=$8, updated_at=NOW() WHERE id=(SELECT id FROM contact LIMIT 1) RETURNING *',
      [phone, whatsapp, address, address_ar, hours, hours_ar, facebook, maps_query],
    )
    if (result.rows.length === 0) {
      const inserted = await pool.query(
        'INSERT INTO contact (phone, whatsapp, address, address_ar, hours, hours_ar, facebook, maps_query) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [phone, whatsapp, address, address_ar, hours, hours_ar, facebook, maps_query],
      )
      return res.json(inserted.rows[0])
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
