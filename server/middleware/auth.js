import { verifyToken } from '@clerk/backend'

const authenticate = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const token = header.split(' ')[1]
    const claims = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    })
    req.user = claims
    next()
  } catch (err) {
    console.error('Auth error:', err.message, err.reason || err.code || '')
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export default authenticate
