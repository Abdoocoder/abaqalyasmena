import app from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`)
})
