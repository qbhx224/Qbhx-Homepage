<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">千杯寒雪</div>
      <p class="footer-text">莫见乎隐，莫显乎微，故君子慎其独也</p>
      <div class="footer-links">
        <a href="https://github.com/qbhx224" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span class="divider">·</span>
        <a href="https://blog.qbhx123.top" target="_blank" rel="noopener noreferrer">Blog</a>
        <span class="divider">·</span>
        <a href="https://space.bilibili.com/383024178" target="_blank" rel="noopener noreferrer">Bilibili</a>
        <span class="divider">·</span>
        <a href="mailto:contact@qbhx123.top">Email</a>
      </div>
      <p class="footer-copy">&copy; {{ year }} 千杯寒雪. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  padding: 48px 24px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 8px;
}

.footer-text {
  color: var(--text-secondary);
  margin-bottom: 20px;
  font-size: 0.95rem;
  font-style: italic;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color var(--transition);
}

.footer-links a:hover { color: var(--accent); }

.divider { color: var(--border); }

.footer-copy {
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
