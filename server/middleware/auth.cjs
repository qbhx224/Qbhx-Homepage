const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

function getConfig() {
  const configPath = path.join(__dirname, '..', 'data', 'config.json')
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未提供认证令牌' })
  }

  const token = authHeader.split(' ')[1]
  const config = getConfig()

  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: '令牌无效或已过期' })
  }
}

module.exports = authMiddleware
