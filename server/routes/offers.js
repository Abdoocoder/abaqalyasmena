import { Router } from 'express'
import pool from '../db.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM offers ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM offers WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', authenticate, async (req, res) => {
  try {
    const { title, title_ar, description, price, tag, image_url } = req.body
    const result = await pool.query(
      'INSERT INTO offers (title, title_ar, description, price, tag, image_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [title, title_ar, description || '', price || '', tag || '', image_url || ''],
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params
    const { title, title_ar, description, price, tag, image_url } = req.body
    const result = await pool.query(
      'UPDATE offers SET title=$1, title_ar=$2, description=$3, price=$4, tag=$5, image_url=$6 WHERE id=$7 RETURNING *',
      [title, title_ar, description, price, tag, image_url, id],
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM offers WHERE id = $1', [id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
