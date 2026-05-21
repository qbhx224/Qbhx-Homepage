const https = require('https')
const fs = require('fs')
const path = require('path')

const GITHUB_USER = 'qbhx224'
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes
const DATA_DIR = path.join(__dirname, '..', 'data')

let cache = { data: null, ts: 0 }

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'QbhxHomepage/1.0' } }, (res) => {
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8')))
        } catch (e) {
          reject(e)
        }
      })
      res.on('error', reject)
    }).on('error', reject)
  })
}

function getProjectSort() {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'projects-sort.json'), 'utf-8'))
    return data
  } catch {
    return { order: [], hidden: [] }
  }
}

function saveProjectSort(data) {
  const filePath = path.join(DATA_DIR, 'projects-sort.json')
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

async function getRepos() {
  const now = Date.now()
  if (cache.data && now - cache.ts < CACHE_TTL) {
    return cache.data
  }

  try {
    const repos = await fetchJSON(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)
    const items = repos.map((r) => ({
      id: r.name,
      name: r.name,
      description: r.description || '',
      github: r.html_url,
      stars: r.stargazers_count,
      fork: r.fork,
      language: r.language || '',
      topics: r.topics || [],
      updatedAt: r.updated_at,
      homepage: r.homepage || ''
    }))
    cache = { data: items, ts: now }
    return items
  } catch (e) {
    console.error('Failed to fetch GitHub repos:', e.message)
    return cache.data || []
  }
}

async function getProjects(filterHidden = true) {
  const repos = await getRepos()
  const sort = getProjectSort()

  // Apply sort order
  const order = sort.order || []
  const sorted = [...repos].sort((a, b) => {
    const ia = order.indexOf(a.id)
    const ib = order.indexOf(b.id)
    if (ia !== -1 && ib !== -1) return ia - ib
    if (ia !== -1) return -1
    if (ib !== -1) return 1
    return new Date(b.updatedAt) - new Date(a.updatedAt)
  })

  if (!filterHidden) return sorted

  // Filter hidden
  const hidden = new Set(sort.hidden || [])
  return sorted.filter((r) => !hidden.has(r.id))
}

module.exports = { getProjects, getProjectSort, saveProjectSort }
