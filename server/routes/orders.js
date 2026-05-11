import { Router } from 'express';
import pool from '../db.js';
import authenticate from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { customer_name, phone, items, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO orders (customer_name, phone, items, notes) VALUES ($1,$2,$3,$4) RETURNING *',
      [customer_name, phone, JSON.stringify(items || []), notes || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
