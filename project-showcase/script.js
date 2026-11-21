const projects = [
  {
    title: 'PDF Nova',
    category: 'app',
    kicker: 'PDF VOSITALARI',
    description: 'PDF fayllarni birlashtirish, ajratish, konvertatsiya qilish va tarjima qilish platformasi.',
    tech: ['Next.js', 'TypeScript', 'OCR'],
    demo: 'https://axror-pdfnova.netlify.app',
    github: 'https://github.com/akramovahror722-coder/pdfnova',
    mark: 'PDF',
    year: '2026',
    status: 'Jarayonda',
  },
  {
    title: 'NavbatGo',
    category: 'app',
    kicker: 'ELEKTRON NAVBAT',
    description: 'Onlayn navbat, chipta, admin panel va real vaqtdagi navbat ekrani bilan PWA tizimi.',
    tech: ['HTML', 'JavaScript', 'PWA'],
    demo: 'https://axror-navbatgo.netlify.app',
    mark: 'NG',
    year: '2025',
    status: 'Tayyor',
  },
  {
    title: 'ExpensePro AI',
    category: 'app',
    kicker: 'MOLIYA BOSHQARUVI',
    description: 'Kirim-chiqim, hamyonlar, moliyaviy maqsadlar va AI tavsiyalari bitta dashboardda.',
    tech: ['JavaScript', 'Charts', 'LocalStorage'],
    demo: 'https://expensepro-mocha.vercel.app',
    mark: '$',
    year: '2025',
    status: 'Tayyor',
  },
  {
    title: 'FanLab',
    category: 'web',
    kicker: 'VIRTUAL LABORATORIYA',
    description: 'Kimyo, biologiya, fizika, ekologiya va astronomiyani tajriba hamda testlar orqali o‘rganish.',
    tech: ['React', 'TypeScript', 'Vite'],
    demo: 'https://axror-fanlab.netlify.app',
    mark: 'FL',
    year: '2025',
    status: 'Tayyor',
  },
  {
    title: 'CyberSnake Neo',
    category: 'game',
    kicker: '11 TA O‘YIN',
    description: 'Snake, Tetris, 2048, Pong va boshqa o‘yinlarni jamlagan neon uslubidagi o‘yin markazi.',
    tech: ['JavaScript', 'Canvas', 'CSS'],
    demo: 'https://axror-oyinlar.netlify.app',
    mark: 'CS',
    year: '2024',
    status: 'Tayyor',
  },
  {
    title: 'DevQuiz Pro',
    category: 'web',
    kicker: 'DASTURLASH TESTI',
    description: 'HTML, CSS, JavaScript va IT bo‘yicha 35 savolli interaktiv viktorina.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://axror-devquiz.netlify.app',
    mark: 'DQ',
    year: '2024',
    status: 'Tayyor',
  },
  {
    title: 'ProKanban',
    category: 'app',
    kicker: 'VAZIFA BOSHQARUVI',
    description: 'Vazifalarni ustunlar bo‘yicha boshqarish, ustuvorlik berish va jarayonni kuzatish.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://axror-kanban.netlify.app',
    mark: 'PK',
    year: '2024',
    status: 'Tayyor',
  },
  {
    title: 'Ottawa Metal Roofers',
    category: 'web',
    kicker: 'MIJOZ UCHUN SAYT',
    description: 'Xizmatlar, galereya va 50 yillik kafolat bo‘limlariga ega zamonaviy landing page.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://axror-ottawa-roofers.netlify.app',
    mark: 'OM',
    year: '2024',
    status: 'Tayyor',
  },
  {
    title: 'Vaqt',
    category: 'web',
    kicker: 'VAQTNI BOSHQARISH',
    description: 'Soat, taymer va kundalik ishlar uchun yengil, minimal boshqaruv paneli.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://axror-vaqt.netlify.app',
    mark: 'V',
    year: '2024',
    status: 'Tayyor',
  },
  {
    title: 'AI Chat',
    category: 'app',
    kicker: 'SUN’IY INTELLEKT',
    description: 'Pollinations API asosidagi bepul AI suhbatdosh: to‘rtta model, chat tarixi va kod yordami.',
    tech: ['React', 'TypeScript', 'AI'],
    demo: 'https://akramovahror722-coder.github.io/ai-chat/',
    github: 'https://github.com/akramovahror722-coder/ai-chat',
    mark: 'AI',
    year: '2025',
    status: 'Tayyor',
  },
  {
    title: 'PDF Workspace',
    category: 'study',
    kicker: 'PDF ISH MAYDONI',
    description: 'PDF konvertatsiyasi, siqish, sahifalarni tahrirlash va hujjat vositalari.',
    tech: ['HTML', 'PDF.js', 'JavaScript'],
    demo: 'https://axror-uyishi.netlify.app',
    mark: 'PW',
    year: '2024',
    status: 'Tayyor',
  },
  {
    title: 'Dars mashqlari',
    category: 'study',
    kicker: 'O‘QUV LOYIHALARI',
    description: 'HTML, CSS va JavaScript bo‘yicha layout, animatsiya va DOM mashqlari.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://akramovahror722-coder.github.io/dars-mashqlari/',
    github: 'https://github.com/akramovahror722-coder/dars-mashqlari',
    mark: 'D',
    year: '2023',
    status: 'Tayyor',
  },
  {
    title: 'React Mashqi',
    category: 'study',
    kicker: 'REACT AMALIYOTI',
    description: 'React komponentlari, props, state va hookslarni sinab ko‘rish uchun amaliy loyiha.',
    tech: ['React', 'Vite', 'JavaScript'],
    demo: 'https://akramovahror722-coder.github.io/react-mashqi/',
    github: 'https://github.com/akramovahror722-coder/react-mashqi',
    mark: 'R',
    year: '2024',
    status: 'Tayyor',
  },
  {
    title: 'Havo',
    category: 'app',
    kicker: 'OB-HAVO DASHBOARDI',
    description: 'Shahar qidiruvi, joriy ob-havo va Open-Meteo orqali 7 kunlik bashorat.',
    tech: ['React', 'TypeScript', 'Open-Meteo'],
    demo: 'https://akramovahror722-coder.github.io/havo/',
    github: 'https://github.com/akramovahror722-coder/havo',
    mark: 'H',
    year: '2026',
    status: 'Tayyor',
  },
  {
    title: 'Taomlar Kitobi',
    category: 'app',
    kicker: 'RETSEPTLAR TO‘PLAMI',
    description: 'O‘zbek va jahon taomlari retseptlari, porsiya kalkulyatori va sevimlilar.',
    tech: ['React', 'TypeScript', 'Recipes'],
    demo: 'https://akramovahror722-coder.github.io/taomlar-kitobi/',
    github: 'https://github.com/akramovahror722-coder/taomlar-kitobi',
    mark: 'TK',
    year: '2026',
    status: 'Tayyor',
  },
  {
    title: 'Eslatmalar',
    category: 'app',
    kicker: 'SHAXSIY QAYDLAR',
    description: 'Teglar, qidiruv, avtomatik saqlash va JSON eksportiga ega eslatmalar.',
    tech: ['React', 'TypeScript', 'LocalStorage'],
    demo: 'https://akramovahror722-coder.github.io/eslatmalar/',
    github: 'https://github.com/akramovahror722-coder/eslatmalar',
    mark: 'E',
    year: '2026',
    status: 'Tayyor',
  },
  {
    title: 'FitTrack',
    category: 'app',
    kicker: 'FITNES VA SALOMATLIK',
    description: 'Mashq rejalari, interval taymer, kundalik jurnal va rivojlanish grafigi.',
    tech: ['React', 'TypeScript', 'Fitness'],
    demo: 'https://akramovahror722-coder.github.io/fittrack/',
    github: 'https://github.com/akramovahror722-coder/fittrack',
    mark: 'FT',
    year: '2026',
    status: 'Tayyor',
  },
]

const grid = document.querySelector('#project-grid')
const filters = [...document.querySelectorAll('.filter-button')]
const search = document.querySelector('#project-search')
const count = document.querySelector('#results-count')
const emptyState = document.querySelector('#empty-state')
let activeFilter = 'all'

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

function renderCard(project) {
  const searchText = [project.title, project.kicker, project.description, ...project.tech].join(' ')
  const githubLink = project.github
    ? `<a class="code-link" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(project.title)} GitHub kodi">GH</a>`
    : ''

  return `
    <article class="project-card" data-category="${escapeHtml(project.category)}" data-search="${escapeHtml(searchText)}">
      <div class="card-top">
        <span class="project-icon icon-${escapeHtml(project.category)}">${escapeHtml(project.mark)}</span>
        <span class="live-status"><i></i> ${escapeHtml(project.status)}</span>
      </div>
      <p class="card-kicker">${escapeHtml(project.kicker)}</p>
      <h3>${escapeHtml(project.title)}</h3>
      <p class="card-description">${escapeHtml(project.description)}</p>
      <div class="tags">${project.tech.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      <div class="card-actions">
        <a class="visit-link" href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer">
          Saytni ko‘rish <span aria-hidden="true">↗</span>
        </a>
        ${githubLink}
      </div>
    </article>
  `
}

function updateProjects() {
  const query = search.value.trim().toLocaleLowerCase('uz')
  const visibleProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter
    const searchText = [project.title, project.kicker, project.description, ...project.tech]
      .join(' ')
      .toLocaleLowerCase('uz')
    return matchesFilter && searchText.includes(query)
  })

  grid.innerHTML = visibleProjects.map(renderCard).join('')
  count.textContent = `${visibleProjects.length} ta loyiha`
  emptyState.hidden = visibleProjects.length !== 0
}

for (const filter of filters) {
  filter.addEventListener('click', () => {
    activeFilter = filter.dataset.filter
    for (const button of filters) {
      const selected = button === filter
      button.classList.toggle('is-active', selected)
      button.setAttribute('aria-pressed', String(selected))
    }
    updateProjects()
  })
}

search.addEventListener('input', updateProjects)
updateProjects()
