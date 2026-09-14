<template>
  <div class="site-shell" :lang="locale">
    <a class="skip-link" href="#main-content">{{ copy.skip }}</a>

    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-name" href="#top">Kehan Pang</a>

        <div class="header-actions">
          <nav class="profile-nav" :aria-label="copy.navLabel">
            <a :href="cvLink" target="_blank" rel="noopener noreferrer">C.V.</a>
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

    <div id="top" class="page-frame anchor-target">
      <aside class="profile-rail" :aria-label="copy.railLinksLabel">
        <figure class="profile-photo">
          <img src="/portrait.webp" :alt="copy.photoAlt" width="720" height="900" fetchpriority="high">
        </figure>

        <div class="profile-identity">
          <h1 id="profile-title">
            <span>{{ copy.heroPrimary }}</span>
            <small>{{ copy.heroSecondary }}</small>
          </h1>
          <p class="profile-role">
            <strong>{{ copy.role }}</strong>
            <span>{{ copy.affiliation }}</span>
            <span>{{ copy.university }}</span>
          </p>
        </div>

        <nav class="rail-links" :aria-label="copy.railLinksLabel">
          <a
            v-for="item in profileLinks"
            :key="item.key"
            :href="item.href"
            :target="item.newTab ? '_blank' : null"
            :rel="item.newTab ? 'noopener noreferrer' : null"
            :title="item.title || item.label"
          >
            <svg class="rail-link__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path v-for="path in profileIconPaths[item.key]" :key="path" :d="path"></path>
            </svg>
            <span>{{ item.label }}</span>
          </a>
        </nav>
      </aside>

      <main id="main-content">
        <section class="profile-introduction" aria-labelledby="about-title">
          <div id="about" class="profile-about anchor-target">
            <h2 id="about-title">{{ copy.sections.about }}</h2>
            <div class="prose">
              <p v-for="paragraph in copy.about" :key="paragraph" v-html="paragraph"></p>
            </div>
          </div>

          <dl class="profile-details">
            <div id="research-interests" class="profile-meta-row anchor-target">
              <dt class="profile-meta-label">{{ copy.researchLabel }}</dt>
              <dd class="profile-meta-value">
                <span v-for="(item, index) in copy.research" :key="item">
                  {{ item }}<template v-if="index < copy.research.length - 1"> · </template>
                </span>
              </dd>
            </div>
            <div class="personal-detail">
              <dt class="visually-hidden">{{ copy.personalLabel }}</dt>
              <dd>
                <button
                  class="personal-reveal"
                  type="button"
                  :aria-label="personalToggleLabel"
                  :aria-pressed="personalRevealed ? 'true' : 'false'"
                  @click="togglePersonal"
                >
                  <span class="personal-secret profile-meta-row" :class="{ 'is-revealed': personalRevealed }">
                    <span class="profile-meta-label">{{ copy.personalLabel }}</span>
                    <span class="profile-meta-value">{{ copy.personalInfo }}</span>
                  </span>
                </button>
              </dd>
            </div>
          </dl>
        </section>

        <section id="timeline" class="page-section anchor-target" aria-labelledby="timeline-title">
          <header class="section-header">
            <h2 id="timeline-title">{{ copy.sections.timeline }}</h2>
          </header>

          <div class="career-timeline">
            <div class="unified-timeline-scroll" tabindex="0" :aria-label="copy.sections.timeline">
              <div class="unified-timeline">
                <p class="timeline-layer-label timeline-layer-label--education">{{ copy.timelineLabels.education }}</p>
                <article
                  v-for="item in copy.education"
                  :key="item.institution"
                  class="education-range"
                  :class="`tone-${item.tone}`"
                  :style="{ left: `${item.start}%`, width: `${item.end - item.start}%` }"
                >
                  <div class="education-range__content">
                    <div class="education-range__topline">
                      <h3>{{ item.institution }}</h3>
                      <time>{{ item.period }}</time>
                    </div>
                    <p class="education-range__secondary">{{ item.program }}</p>
                    <p class="education-range__meta">
                      <template v-if="item.meta">{{ item.meta }}</template>
                      <template v-if="item.advisors">
                        <span>{{ item.advisorsLabel }}</span>
                        <template v-for="(advisor, index) in item.advisors">
                          <span v-if="advisor.prefix" :key="`${advisor.name}-prefix`">{{ advisor.prefix }}</span><a :key="advisor.name" :href="advisor.href" target="_blank" rel="noopener noreferrer">{{ advisor.name }}</a><span v-if="advisor.suffix" :key="`${advisor.name}-suffix`">{{ advisor.suffix }}</span><span v-if="index < item.advisors.length - 1" :key="`${advisor.name}-separator`">{{ item.advisorSeparator }}</span>
                        </template>
                        <span v-if="!item.separateResearch"> · {{ item.researchLabel }}{{ item.research }}</span>
                      </template>
                    </p>
                    <p v-if="item.separateResearch" class="education-range__research">{{ item.researchLabel }}{{ item.research }}</p>
                  </div>
                  <span class="timeline-range-bar" aria-hidden="true"></span>
                </article>

                <p class="timeline-layer-label timeline-layer-label--news">{{ copy.timelineLabels.news }}</p>
                <div class="unified-timeline__axis" aria-hidden="true">
                  <time class="timeline-endpoint timeline-endpoint--start">2018.09</time>
                  <time class="timeline-endpoint timeline-endpoint--end">2027.04</time>
                </div>
                <a
                  v-for="item in copy.news"
                  :key="`${item.date}-${item.event}-${item.status}`"
                  class="news-event"
                  :class="[
                    `news-event--${item.side}`,
                    `news-event--lane-${item.lane}`,
                    `news-event--${item.kind}`,
                    `tone-${item.tone}`,
                    { 'news-event--align-end': item.align === 'end' }
                  ]"
                  :style="{ left: `${item.position}%` }"
                  :href="item.target"
                  @click="scrollToTimelineTarget($event, item.target)"
                >
                  <span class="news-event__connector" aria-hidden="true"></span>
                  <span class="news-event__label">
                    <time class="news-event__date">{{ item.date }}</time>
                    <span class="news-event__text">{{ item.event }}</span>
                    <span class="news-event__status">{{ item.status }}</span>
                  </span>
                </a>

                <p class="timeline-layer-label timeline-layer-label--experience">{{ copy.timelineLabels.work }}</p>
                <div class="experience-list">
                  <details
                    v-for="item in copy.experience"
                    :key="item.organization"
                    class="experience-disclosure"
                    :class="[`tone-${item.tone}`, `experience-disclosure--row-${item.row}`]"
                    :style="experienceItemStyle(item)"
                  >
                    <summary class="experience-summary">
                      <span
                        class="experience-range"
                        :style="experienceRangeStyle(item)"
                      >
                        <span class="timeline-range-bar" aria-hidden="true"></span>
                      </span>
                      <span class="experience-range__content">
                        <span class="experience-disclosure__marker" aria-hidden="true"></span>
                        <span class="experience-range__topline">
                          <strong class="experience-range__name">{{ item.organization }}</strong>
                          <time>{{ item.period }}</time>
                        </span>
                        <span class="experience-range__role"><span v-if="item.department">{{ item.department }} · </span>{{ item.role }}<span v-if="item.unit"> · {{ item.unit }}</span></span>
                      </span>
                    </summary>
                    <div class="experience-detail">
                      <p>{{ item.detail }}</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="publications" class="page-section anchor-target" aria-labelledby="publications-title">
          <header class="section-header">
            <h2 id="publications-title">{{ copy.sections.publications }}</h2>
            <p class="section-note">{{ copy.publicationNote }}</p>
          </header>

          <div v-for="group in publicationGroups" :key="group.year" class="publication-year">
            <h3>{{ group.year }}</h3>
            <ol>
              <li
                v-for="publication in group.items"
                :id="publication.id"
                :key="publication.title"
                class="publication publication-anchor"
              >
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

      <section id="honors" class="page-section anchor-target" aria-labelledby="awards-title">
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

      <section id="contact" class="page-section contact-section anchor-target" aria-labelledby="contact-title">
        <header class="section-header">
          <h2 id="contact-title">{{ copy.sections.contact }}</h2>
        </header>
        <p>{{ copy.contactLead }}</p>
        <div class="contact-emails">
          <p><span>{{ copy.emailLabel }}{{ copy.labelSeparator }}</span> <a class="email-link" href="mailto:pangkehan@buaa.edu.cn">pangkehan@buaa.edu.cn</a></p>
          <p><span>{{ copy.alternativeEmailLabel }}{{ copy.labelSeparator }}</span> <a class="email-link" href="mailto:k3hanpang@gmail.com">k3hanpang@gmail.com</a></p>
          <p class="address-line">
            <span>{{ copy.addressLabel }}{{ copy.labelSeparator }}</span>
            <span class="address-value"><template v-for="line in copy.addressLines"><span :key="line">{{ line }}</span></template></span>
          </p>
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
      theme: 'light',
      personalRevealed: false
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
    profileLinks () {
      return [
        { key: 'email', label: this.copy.railLinks.email, href: 'mailto:pangkehan@buaa.edu.cn', newTab: false },
        { key: 'cv', label: this.copy.railLinks.cv, href: this.cvLink, newTab: true },
        { key: 'scholar', label: this.copy.railLinks.scholar, href: links.scholar, newTab: true },
        { key: 'orcid', label: this.copy.railLinks.orcid, href: links.orcid, title: 'ORCID 0009-0006-4086-1421', newTab: true },
        { key: 'github', label: this.copy.railLinks.github, href: links.github, newTab: true }
      ]
    },
    profileIconPaths () {
      return {
        email: ['M3 5h18v14H3z', 'M3 5l9 7 9-7'],
        cv: ['M6 2h9l4 4v16H6z', 'M14 2v5h5', 'M9 12h6', 'M9 16h6'],
        scholar: ['m2 9 10-5 10 5-10 5z', 'M6 11v5c3 2 9 2 12 0v-5', 'M22 9v6'],
        orcid: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M8 10v6', 'M8 7.5v.1', 'M11.5 10H13a3 3 0 0 1 0 6h-1.5z'],
        github: ['M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3 1S18.2.6 15 2.5a13.4 13.4 0 0 0-7 0C4.8.6 3.7 1 3.7 1A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7-.5.6-.9 1.5-1 2.5V22', 'M8 19c-3 .9-3-1.5-4-2']
      }
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
        { id: 'timeline', label: this.copy.sections.timeline },
        { id: 'publications', label: this.copy.sections.publications },
        { id: 'honors', label: this.copy.sections.awards },
        { id: 'academic-service', label: this.copy.sections.service },
        { id: 'contact', label: this.copy.sections.contact }
      ]
    },
    themeToggleLabel () {
      return this.theme === 'dark' ? this.copy.themeToLight : this.copy.themeToDark
    },
    personalToggleLabel () {
      return this.personalRevealed ? this.copy.personalHideLabel : this.copy.personalRevealLabel
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
    togglePersonal () {
      this.personalRevealed = !this.personalRevealed
    },
    experienceItemStyle (item) {
      return {
        marginLeft: `${item.layoutStart}%`,
        width: `${100 - item.layoutStart}%`
      }
    },
    experienceRangeStyle (item) {
      const itemWidth = 100 - item.layoutStart
      return {
        left: `${((item.start - item.layoutStart) / itemWidth) * 100}%`,
        width: `${((item.end - item.start) / itemWidth) * 100}%`
      }
    },
    scrollToTimelineTarget (event, target) {
      if (typeof window === 'undefined' || !target || !target.startsWith('#')) return
      const destination = document.querySelector(target)
      if (!destination) return
      event.preventDefault()
      window.history.pushState(null, '', target)
      destination.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      })
    },
    updateThemeColor () {
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', this.theme === 'dark' ? '#181a1e' : '#f1f2f3')
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
