<template>
  <div class="site-shell" :lang="locale">
    <a class="skip-link" href="#main-content">{{ copy.skip }}</a>

    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-name" href="#top">Kehan Pang</a>

        <div class="header-actions">
          <nav class="profile-nav" :aria-label="copy.navLabel">
            <a :href="cvLink" target="_blank" rel="noopener noreferrer">CV</a>
            <a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a :href="links.scholar" target="_blank" rel="noopener noreferrer">
              <span class="scholar-long">Google Scholar</span><span class="scholar-short">Scholar</span>
            </a>
          </nav>

          <nav class="language-switch" :aria-label="copy.languageLabel">
            <a
              v-for="language in languages"
              :key="language.code"
              :href="language.path"
              :class="{ active: language.code === locale }"
              :aria-current="language.code === locale ? 'page' : null"
              :lang="language.code === 'zh' ? 'zh-CN' : language.code === 'ja' ? 'ja-JP' : 'en-US'"
              @click="switchLanguage($event, language.path)"
            >{{ language.label }}</a>
          </nav>

          <button
            class="theme-toggle"
            type="button"
            :aria-label="themeToggleLabel"
            :title="themeToggleLabel"
            @click="toggleTheme"
          ><span aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span></button>
        </div>
      </div>
    </header>

    <div class="page-frame">
    <main id="main-content">
      <section id="top" class="profile-introduction content-width" aria-labelledby="profile-title">
        <figure class="profile-photo">
          <img src="/portrait.webp" :alt="copy.photoAlt" width="720" height="900" fetchpriority="high">
        </figure>

        <div class="profile-copy">
          <h1 id="profile-title">
            <span>{{ copy.heroPrimary }}</span>
            <small>{{ copy.heroSecondary }}</small>
          </h1>
          <p class="profile-role">
            <strong>{{ copy.role }}</strong>
            <span>{{ copy.affiliation }}</span>
            <span>{{ copy.university }}</span>
          </p>

          <div id="about" class="profile-about anchor-target" :aria-labelledby="'about-title'">
            <h2 id="about-title">{{ copy.sections.about }}</h2>
            <div class="prose">
              <p v-for="paragraph in copy.about" :key="paragraph" v-html="paragraph"></p>
            </div>
          </div>

          <dl class="profile-details">
            <div id="research-interests" class="anchor-target">
              <dt>{{ copy.researchLabel }}</dt>
              <dd>
                <span v-for="(item, index) in copy.research" :key="item">
                  {{ item }}<template v-if="index < copy.research.length - 1"> · </template>
                </span>
              </dd>
            </div>
            <div>
              <dt>{{ copy.mbtiLabel }}</dt>
              <dd>{{ copy.mbti }}</dd>
            </div>
            <div>
              <dt>{{ copy.hobbiesLabel }}</dt>
              <dd>
                <span v-for="(item, index) in copy.hobbies" :key="item">
                  {{ item }}<template v-if="index < copy.hobbies.length - 1"> · </template>
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="publications" class="page-section content-width anchor-target" aria-labelledby="publications-title">
        <header class="section-header">
          <h2 id="publications-title">{{ copy.sections.publications }}</h2>
          <p class="section-note">{{ copy.publicationNote }}</p>
        </header>

        <div v-for="group in publicationGroups" :key="group.year" class="publication-year">
          <h3>{{ group.year }}</h3>
          <ol>
            <li v-for="publication in group.items" :key="publication.title" class="publication">
              <div class="publication__heading">
                <div class="publication__labels">
                  <span class="venue-badge">{{ publication.venue }}</span>
                  <span class="ccf-badge">{{ copy.ccf[publication.ccfType] }}</span>
                </div>
                <a :href="publication.href" target="_blank" rel="noopener noreferrer">{{ publication.title }}</a>
              </div>
              <p class="authors">
                <template v-for="(author, index) in publication.authors">
                  <strong v-if="author === 'Kehan Pang'" :key="author">{{ author }}</strong><span v-else :key="author">{{ author }}</span><span v-if="index < publication.authors.length - 1" :key="`${author}-comma`">, </span>
                </template>
              </p>
              <p class="publication__details">{{ publication.details }}</p>
              <a class="doi-link" :href="publication.href" target="_blank" rel="noopener noreferrer">{{ copy.doiLabel }}: {{ publication.doi }}</a>
            </li>
          </ol>
        </div>

        <div class="manuscripts" aria-labelledby="manuscripts-title">
          <h3 id="manuscripts-title">{{ copy.sections.manuscripts }}</h3>
          <ul>
            <li v-for="manuscript in copy.manuscripts" :key="manuscript.title">
              <span class="status-badge">{{ manuscript.status }}</span>
              <div>
                <h4>{{ manuscript.title }}</h4>
                <p class="authors">
                  <template v-for="(author, index) in manuscript.authors">
                    <strong v-if="author === 'Kehan Pang'" :key="author">{{ author }}</strong><span v-else :key="author">{{ author }}</span><span v-if="index < manuscript.authors.length - 1" :key="`${author}-comma`">, </span>
                  </template>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="education" class="page-section content-width anchor-target" aria-labelledby="education-title">
        <header class="section-header">
          <h2 id="education-title">{{ copy.sections.education }}</h2>
        </header>
        <div class="timeline">
          <article v-for="item in copy.education" :key="item.institution" class="timeline-item">
            <p class="timeline-item__period">{{ item.period }}</p>
            <h3>{{ item.institution }}</h3>
            <p class="timeline-item__role">{{ item.degree }}</p>
            <p v-if="item.unit" class="timeline-item__unit">{{ item.unit }}</p>
            <p v-if="item.advisors" class="advisor-line">
              <span>{{ item.advisorsLabel }}</span>
              <template v-for="(advisor, index) in item.advisors">
                <a :key="advisor.name" :href="advisor.href" target="_blank" rel="noopener noreferrer">{{ advisor.name }}</a><span v-if="index < item.advisors.length - 1" :key="`${advisor.name}-separator`">; </span>
              </template>
            </p>
            <ul v-if="item.notes.length" class="compact-list">
              <li v-for="note in item.notes" :key="note">{{ note }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="experience" class="page-section content-width anchor-target" aria-labelledby="experience-title">
        <header class="section-header">
          <h2 id="experience-title">{{ copy.sections.experience }}</h2>
        </header>
        <div class="experience-list">
          <article v-for="item in copy.experience" :key="item.organization" class="experience-item">
            <div class="experience-item__topline">
              <div>
                <h3>{{ item.organization }}</h3>
                <p>{{ item.role }}</p>
              </div>
              <time>{{ item.period }}</time>
            </div>
            <ul class="compact-list">
              <li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="honors" class="page-section content-width anchor-target" aria-labelledby="awards-title">
        <header class="section-header">
          <h2 id="awards-title">{{ copy.sections.awards }}</h2>
        </header>
        <div class="honors-grid">
          <ul class="award-list">
            <li v-for="award in copy.awards" :key="award">{{ award }}</li>
          </ul>
          <div class="service-column">
            <div id="academic-service" class="anchor-target">
              <h3>{{ copy.sections.service }}</h3>
              <p v-for="item in copy.service" :key="item">{{ item }}</p>
            </div>
            <div>
              <h3>{{ copy.sections.patent }}</h3>
              <p class="patent-title">{{ copy.patentTitle }}</p>
              <p class="muted">{{ copy.patentStatus }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="page-section contact-section content-width anchor-target" aria-labelledby="contact-title">
        <header class="section-header">
          <h2 id="contact-title">{{ copy.sections.contact }}</h2>
        </header>
        <p>{{ copy.contactLead }}</p>
        <div class="contact-emails">
          <p><span>{{ copy.emailLabel }}{{ copy.labelSeparator }}</span> <a class="email-link" href="mailto:pangkehan@buaa.edu.cn">pangkehan@buaa.edu.cn</a></p>
          <p><span>{{ copy.alternativeEmailLabel }}{{ copy.labelSeparator }}</span> <a class="email-link" href="mailto:k3hanpang@gmail.com">k3hanpang@gmail.com</a></p>
          <p class="address-line"><span>{{ copy.addressLabel }}{{ copy.labelSeparator }}</span> {{ copy.address }}</p>
        </div>
      </section>
    </main>

    <aside class="page-toc" :aria-label="copy.tocLabel">
      <p>{{ copy.tocLabel }}</p>
      <nav>
        <a
          v-for="item in tocItems"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ active: activeSection === item.id }"
          :aria-current="activeSection === item.id ? 'location' : null"
          @click="activeSection = item.id"
        >{{ item.label }}</a>
      </nav>
    </aside>
    </div>

    <footer class="site-footer">
      <div class="content-width">
        <span>© {{ currentYear }} Kehan Pang</span>
        <span class="footer-notes" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>{{ copy.updated }}</span>
        <!-- a blue note, a wine-red chord, and one warm beat -->
      </div>
    </footer>
  </div>
</template>

<script>
import { content, languages, links, publications } from '../data/content'

export default {
  name: 'AcademicHomepage',
  data () {
    return {
      activeSection: 'about',
      observer: null,
      scrollFrame: null,
      theme: 'light'
    }
  },
  computed: {
    locale () {
      return this.$page.frontmatter.locale || 'en'
    },
    copy () {
      return content[this.locale] || content.en
    },
    languages () {
      return languages
    },
    links () {
      return links
    },
    cvLink () {
      return this.locale === 'zh' ? links.cvZh : links.cvEn
    },
    publicationGroups () {
      return ['2026', '2025', '2024'].map(year => ({
        year,
        items: publications.filter(publication => publication.year === year)
      }))
    },
    tocItems () {
      return [
        { id: 'about', label: this.copy.sections.about },
        { id: 'research-interests', label: this.copy.researchLabel },
        { id: 'publications', label: this.copy.sections.publications },
        { id: 'education', label: this.copy.sections.education },
        { id: 'experience', label: this.copy.sections.experience },
        { id: 'honors', label: this.copy.sections.awards },
        { id: 'academic-service', label: this.copy.sections.service },
        { id: 'contact', label: this.copy.sections.contact }
      ]
    },
    themeToggleLabel () {
      return this.theme === 'dark' ? this.copy.themeToLight : this.copy.themeToDark
    },
    currentYear () {
      return 2026
    }
  },
  mounted () {
    const root = document.documentElement
    this.theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    this.updateThemeColor()
    this.setupSectionObserver()
    window.addEventListener('scroll', this.handleSectionScroll, { passive: true })
  },
  beforeDestroy () {
    if (this.observer) this.observer.disconnect()
    window.removeEventListener('scroll', this.handleSectionScroll)
    if (this.scrollFrame) window.cancelAnimationFrame(this.scrollFrame)
  },
  methods: {
    switchLanguage (event, path) {
      if (typeof window === 'undefined') return
      event.preventDefault()
      window.location.assign(`${path}${window.location.hash}`)
    },
    toggleTheme () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', this.theme)
      document.documentElement.style.colorScheme = this.theme
      window.localStorage.setItem('theme', this.theme)
      this.updateThemeColor()
    },
    updateThemeColor () {
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', this.theme === 'dark' ? '#181a1e' : '#f2f3f4')
    },
    handleSectionScroll () {
      if (this.scrollFrame) return
      this.scrollFrame = window.requestAnimationFrame(() => {
        this.scrollFrame = null
        this.updateActiveSection()
      })
    },
    updateActiveSection () {
      const targets = this.tocItems
        .map(item => document.getElementById(item.id))
        .filter(Boolean)
      if (!targets.length) return
      const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atPageEnd) {
        this.activeSection = targets[targets.length - 1].id
        return
      }
      const offset = 82
      const reached = targets.filter(target => target.getBoundingClientRect().top <= offset)
      this.activeSection = (reached[reached.length - 1] || targets[0]).id
    },
    setupSectionObserver () {
      if (!('IntersectionObserver' in window)) return
      this.$nextTick(() => {
        const targets = this.tocItems
          .map(item => document.getElementById(item.id))
          .filter(Boolean)
        this.observer = new IntersectionObserver(() => {
          this.updateActiveSection()
        }, {
          rootMargin: '-78px 0px -65% 0px',
          threshold: [0, 0.01, 0.25]
        })
        targets.forEach(target => this.observer.observe(target))
      })
    }
  }
}
</script>

<style src="../styles/theme.css"></style>
