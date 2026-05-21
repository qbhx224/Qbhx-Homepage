const { createApp, ref, reactive, onMounted } = Vue

const app = createApp({
  setup() {
    // Auth
    const token = ref(localStorage.getItem('admin_token') || '')
    const password = ref('')
    const logging = ref(false)
    const loginError = ref('')

    // Navigation
    const activeTab = ref('hero')
    const tabs = [
      { key: 'hero', label: '个人信息' },
      { key: 'skills', label: '技能分类' },
      { key: 'projects', label: '项目排序' },
      { key: 'timeline', label: '个人经历' },
      { key: 'photos', label: '相册' }
    ]

    // Data
    const hero = reactive({ name: '', avatar: '', bio: '', location: '', school: '', tags: [], socialLinks: [] })
    const skills = ref([])
    const allRepos = ref([])
    const projectSort = reactive({ order: [], hidden: [] })
    const timeline = ref([])
    const photos = ref([])

    // Icon options
    const socialIconOptions = [
      { value: 'github', label: 'GitHub' },
      { value: 'blog', label: '博客' },
      { value: 'bilibili', label: 'Bilibili' },
      { value: 'email', label: '邮箱' }
    ]
    const skillIconOptions = [
      { value: 'code', label: '代码' },
      { value: 'mobile', label: '移动端' },
      { value: 'server', label: '服务端' },
      { value: 'tool', label: '工具' }
    ]

    // Toast
    const toast = ref(null)
    function showToast(msg, type = 'success') {
      toast.value = { msg, type }
      setTimeout(() => { toast.value = null }, 2500)
    }

    // API helpers
    function authHeaders() {
      return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}` }
    }

    async function apiGet(path) {
      const res = await fetch(path)
      if (!res.ok) throw new Error(`GET ${path} failed`)
      return res.json()
    }

    async function apiPost(path, body) {
      const res = await fetch(path, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) })
      if (!res.ok) throw new Error(`POST ${path} failed`)
      return res.json()
    }

    async function apiPut(path, body) {
      const res = await fetch(path, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) })
      if (!res.ok) throw new Error(`PUT ${path} failed`)
      return res.json()
    }

    async function apiDelete(path) {
      const res = await fetch(path, { method: 'DELETE', headers: authHeaders() })
      if (!res.ok) throw new Error(`DELETE ${path} failed`)
    }

    // Auth actions
    async function login() {
      logging.value = true
      loginError.value = ''
      try {
        const data = await apiPost('/api/auth/login', { password: password.value })
        token.value = data.token
        localStorage.setItem('admin_token', data.token)
        loadData()
      } catch (e) {
        loginError.value = '密码错误或网络异常'
      } finally {
        logging.value = false
      }
    }

    function logout() {
      token.value = ''
      localStorage.removeItem('admin_token')
    }

    // Load all data
    async function loadData() {
      try {
        const [h, s, repos, sort, t, ph] = await Promise.all([
          apiGet('/api/hero'),
          apiGet('/api/skills'),
          apiGet('/api/projects?all=true'),
          apiGet('/api/project-sort'),
          apiGet('/api/timeline'),
          apiGet('/api/photos')
        ])
        Object.assign(hero, h)
        skills.value = s
        allRepos.value = repos
        Object.assign(projectSort, sort)
        timeline.value = t
        photos.value = ph
      } catch (e) {
        showToast('加载数据失败', 'error')
      }
    }

    // Save hero
    async function saveHero() {
      try {
        await apiPut('/api/hero', hero)
        showToast('保存成功')
      } catch (e) {
        showToast('保存失败', 'error')
      }
    }

    // CRUD helpers
    async function saveItem(type, item) {
      try {
        if (item.id) {
          await apiPut(`/api/${type}/${item.id}`, item)
        } else {
          const created = await apiPost(`/api/${type}`, item)
          Object.assign(item, created)
        }
        showToast('保存成功')
      } catch (e) {
        showToast('保存失败', 'error')
      }
    }

    async function deleteItem(type, index) {
      const arr = type === 'skills' ? skills : type === 'timeline' ? timeline : photos
      const item = arr.value[index]
      if (!confirm('确定删除？')) return
      try {
        if (item.id) {
          await apiDelete(`/api/${type}/${item.id}`)
        }
        arr.value.splice(index, 1)
        showToast('已删除')
      } catch (e) {
        showToast('删除失败', 'error')
      }
    }

    // Project sort helpers
    function toggleProject(id) {
      const idx = projectSort.hidden.indexOf(id)
      if (idx !== -1) {
        projectSort.hidden.splice(idx, 1)
      } else {
        projectSort.hidden.push(id)
      }
    }

    function moveProject(index, direction) {
      const newIdx = index + direction
      if (newIdx < 0 || newIdx >= allRepos.value.length) return
      const item = allRepos.value[index]
      allRepos.value.splice(index, 1)
      allRepos.value.splice(newIdx, 0, item)
    }

    async function saveProjectSortConfig() {
      const order = allRepos.value.map((r) => r.id)
      try {
        await apiPut('/api/project-sort', { order, hidden: projectSort.hidden })
        showToast('排序已保存')
      } catch (e) {
        showToast('保存失败', 'error')
      }
    }

    // Add helpers
    function addSkill() {
      skills.value.push({ id: '', name: '新分类', iconType: 'code', items: [] })
    }
    function addTimeline() {
      timeline.value.push({ id: '', year: '', title: '', description: '' })
    }
    function addPhoto() {
      photos.value.push({ id: '', title: '', src: '', description: '' })
    }

    // Init
    onMounted(() => {
      if (token.value) loadData()
    })

    return {
      token, password, logging, loginError,
      activeTab, tabs,
      hero, skills, allRepos, projectSort, timeline, photos,
      socialIconOptions, skillIconOptions,
      toast,
      login, logout,
      saveHero, saveItem, deleteItem,
      toggleProject, moveProject, saveProjectSortConfig,
      addSkill, addTimeline, addPhoto
    }
  }
})

app.mount('#app')
