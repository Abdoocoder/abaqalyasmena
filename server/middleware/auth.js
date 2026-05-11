import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})

const authenticate = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const token = header.split(' ')[1]
    const claims = await clerkClient.verifyToken(token)
    req.user = claims
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export default authenticate
