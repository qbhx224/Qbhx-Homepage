const express = require('express')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.cjs')
const { getLatestPosts } = require('../utils/rss.cjs')
const { getProjects, getProjectSort, saveProjectSort } = require('../utils/github.cjs')

const router = express.Router()
const DATA_DIR = path.join(__dirname, '..', 'data')

// Prevent browser caching for all API responses
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  res.set('Pragma', 'no-cache')
  next()
})

function readJSON(filename) {
  const filePath = path.join(DATA_DIR, filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename)
  const tmpPath = filePath + '.tmp'
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8')
  fs.renameSync(tmpPath, filePath)
}

// Auth routes
router.post('/auth/login', (req, res) => {
  const { password } = req.body
  const config = readJSON('config.json')

  if (!config.adminPasswordHash) {
    return res.status(400).json({ error: '管理员密码未设置，请先运行 set-password' })
  }

  if (!password || !bcrypt.compareSync(password, config.adminPasswordHash)) {
    return res.status(401).json({ error: '密码错误' })
  }

  const token = jwt.sign({ role: 'admin' }, config.jwtSecret, { expiresIn: '24h' })
  res.json({ token })
})

// Public: GET endpoints
router.get('/hero', (req, res) => {
  res.json(readJSON('hero.json'))
})

router.get('/skills', (req, res) => {
  res.json(readJSON('skills.json'))
})

// Projects: auto-fetch from GitHub with manual sort
router.get('/projects', async (req, res) => {
  const all = req.query.all === 'true'
  const projects = await getProjects(!all)
  res.json(projects)
})

// Project sort config
router.get('/project-sort', (req, res) => {
  res.json(getProjectSort())
})

router.put('/project-sort', auth, (req, res) => {
  saveProjectSort(req.body)
  res.json({ success: true })
})

// Blog: auto-fetch from RSS or fallback to local JSON
router.get('/blog', async (req, res) => {
  if (req.query.latest === 'true') {
    const limit = Math.min(parseInt(req.query.limit) || 5, 20)
    const posts = await getLatestPosts(limit)
    return res.json(posts)
  }
  res.json(readJSON('blog.json'))
})

router.get('/timeline', (req, res) => {
  res.json(readJSON('timeline.json'))
})

router.get('/photos', (req, res) => {
  res.json(readJSON('photos.json'))
})

router.get('/config/backgrounds', (req, res) => {
  const config = readJSON('config.json')
  res.json(config.backgrounds || [])
})

// Visitor counter (global, per-day dedup by IP)
router.get('/visitors', (req, res) => {
  const data = readJSON('visitors.json')
  res.json({ total: data.total || 0 })
})

router.post('/visitors', (req, res) => {
  const today = new Date().toISOString().slice(0, 10)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
  const data = readJSON('visitors.json')

  if (!data.todayLog) data.todayLog = []

  // Dedup: same IP only counts once per day
  if (data.today !== today) {
    data.today = today
    data.todayLog = []
  }

  if (!data.todayLog.includes(ip)) {
    data.todayLog.push(ip)
    data.total = (data.total || 0) + 1
    writeJSON('visitors.json', data)
  }

  res.json({ total: data.total })
})

// Admin: PUT hero
router.put('/hero', auth, (req, res) => {
  writeJSON('hero.json', req.body)
  res.json({ success: true })
})

// Generic CRUD factory for array-based content
function createCRUD(typeName, filename) {
  router.get(`/${typeName}`, (req, res) => {
    res.json(readJSON(filename))
  })

  router.post(`/${typeName}`, auth, (req, res) => {
    const items = readJSON(filename)
    items.push(req.body)
    writeJSON(filename, items)
    res.json({ success: true, item: req.body })
  })

  router.put(`/${typeName}/:id`, auth, (req, res) => {
    const items = readJSON(filename)
    const index = items.findIndex((item) => item.id === req.params.id)
    if (index === -1) return res.status(404).json({ error: '未找到' })
    items[index] = { ...items[index], ...req.body, id: req.params.id }
    writeJSON(filename, items)
    res.json({ success: true, item: items[index] })
  })

  router.delete(`/${typeName}/:id`, auth, (req, res) => {
    let items = readJSON(filename)
    items = items.filter((item) => item.id !== req.params.id)
    writeJSON(filename, items)
    res.json({ success: true })
  })
}

createCRUD('skills', 'skills.json')
// blog GET is handled above with RSS support; only register admin CRUD
router.post('/blog', auth, (req, res) => {
  const items = readJSON('blog.json')
  items.push(req.body)
  writeJSON('blog.json', items)
  res.json({ success: true, item: req.body })
})
router.put('/blog/:id', auth, (req, res) => {
  const items = readJSON('blog.json')
  const index = items.findIndex((item) => item.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: '未找到' })
  items[index] = { ...items[index], ...req.body, id: req.params.id }
  writeJSON('blog.json', items)
  res.json({ success: true, item: items[index] })
})
router.delete('/blog/:id', auth, (req, res) => {
  let items = readJSON('blog.json')
  items = items.filter((item) => item.id !== req.params.id)
  writeJSON('blog.json', items)
  res.json({ success: true })
})
createCRUD('timeline', 'timeline.json')
createCRUD('photos', 'photos.json')

module.exports = router
