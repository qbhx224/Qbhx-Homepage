const express = require('express')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const apiRoutes = require('./routes/api.cjs')

const app = express()
const PORT = process.env.PORT || 3000
const DATA_DIR = path.join(__dirname, 'data')

// Middleware
app.use(express.json({ limit: '10mb' }))

// Handle --set-password flag
if (process.argv.includes('--set-password')) {
  const idx = process.argv.indexOf('--set-password')
  const password = process.argv[idx + 1]
  if (!password) {
    console.error('用法: node server/index.js --set-password <密码>')
    process.exit(1)
  }
  const configPath = path.join(DATA_DIR, 'config.json')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  config.adminPasswordHash = bcrypt.hashSync(password, 10)
  if (!config.jwtSecret) {
    config.jwtSecret = require('crypto').randomBytes(32).toString('hex')
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')
  console.log('管理员密码已设置成功！')
  process.exit(0)
}

// API routes
app.use('/api', apiRoutes)

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')))

// Serve Vue homepage (dist/)
const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
  console.log(`管理面板: http://localhost:${PORT}/admin`)

  const configPath = path.join(DATA_DIR, 'config.json')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  if (!config.adminPasswordHash) {
    console.log('\n⚠️  管理员密码未设置，请运行:')
    console.log(`   node server/index.js --set-password <你的密码>\n`)
  }
})
