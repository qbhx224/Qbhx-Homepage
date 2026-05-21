const https = require('https')
const http = require('http')

const BLOG_FEED_URL = 'https://blog.qbhx123.top/feed/'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

let cache = { data: null, ts: 0 }

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http
    mod.get(url, { headers: { 'User-Agent': 'QbhxHomepage/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve, reject)
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function escapeCDATA(str) {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

function parseDate(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

function parseRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1]

    const title = escapeCDATA((block.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '')
    const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || ''
    const pubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || ''
    const description = escapeCDATA((block.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '')
    const category = escapeCDATA((block.match(/<category>([\s\S]*?)<\/category>/) || [])[1] || '')

    if (title && link) {
      items.push({
        id: `rss-${Buffer.from(link).toString('base64url').slice(0, 12)}`,
        title,
        url: link,
        date: parseDate(pubDate),
        category,
        excerpt: description.replace(/<[^>]+>/g, '').slice(0, 200)
      })
    }
  }

  return items
}

async function getLatestPosts(limit = 5) {
  const now = Date.now()
  if (cache.data && now - cache.ts < CACHE_TTL) {
    return cache.data.slice(0, limit)
  }

  try {
    const xml = await fetch(BLOG_FEED_URL)
    const posts = parseRSS(xml)
    cache = { data: posts, ts: now }
    return posts.slice(0, limit)
  } catch (e) {
    console.error('Failed to fetch blog RSS:', e.message)
    return cache.data ? cache.data.slice(0, limit) : []
  }
}

module.exports = { getLatestPosts }
