import { Router } from 'express'
import pool from '../db.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { search, category_id } = req.query
    let query = `
      SELECT p.*, c.name_ar as category_name_ar, c.name as category_name
      FROM products p LEFT JOIN categories c ON p.category_id = c.id
    `
    const params = []
    const conditions = []

    if (search) {
      conditions.push('(p.name_ar ILIKE $1 OR p.name ILIKE $1 OR p.brand ILIKE $1)')
      params.push(`%${search}%`)
    }
    if (category_id) {
      conditions.push(`p.category_id = $${params.length + 1}`)
      params.push(category_id)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY p.created_at DESC'
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT p.*, c.name_ar as category_name_ar, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
      [id],
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', authenticate, async (req, res) => {
  try {
    const { category_id, name, name_ar, brand, price, old_price, discount, image_url } = req.body
    const result = await pool.query(
      'INSERT INTO products (category_id, name, name_ar, brand, price, old_price, discount, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [
        category_id,
        name,
        name_ar,
        brand || '',
        price,
        old_price || null,
        discount || '',
        image_url || '',
      ],
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params
    const { category_id, name, name_ar, brand, price, old_price, discount, image_url } = req.body
    const result = await pool.query(
      'UPDATE products SET category_id=$1, name=$2, name_ar=$3, brand=$4, price=$5, old_price=$6, discount=$7, image_url=$8 WHERE id=$9 RETURNING *',
      [category_id, name, name_ar, brand, price, old_price, discount, image_url, id],
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
    await pool.query('DELETE FROM products WHERE id = $1', [id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
