<template>
  <div class="site-shell" :lang="locale">
    <a class="skip-link" href="#main-content">{{ copy.skip }}</a>

    <header class="site-header">
      <div class="site-header__inner">
        <a class="monogram" href="#top" aria-label="Kehan Pang">KP</a>

        <div class="header-actions">
          <nav class="profile-nav" :aria-label="copy.navLabel">
            <a :href="links.cv" target="_blank" rel="noopener">CV</a>
            <a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a :href="links.scholar" target="_blank" rel="noopener noreferrer">Google Scholar</a>
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
        </div>
      </div>
    </header>

    <main id="main-content">
      <section id="top" class="hero" aria-labelledby="hero-title">
        <div class="hero__glow hero__glow--blue" aria-hidden="true"></div>
        <div class="hero__glow hero__glow--wine" aria-hidden="true"></div>
        <div class="content-width hero__inner">
          <div class="hero__copy">
            <p class="eyebrow">Academic Homepage</p>
            <h1 id="hero-title">{{ copy.heroPrimary }}</h1>
            <p class="hero__secondary">{{ copy.heroSecondary }}</p>
            <div class="hero__role">
              <strong>{{ copy.role }}</strong>
              <span>{{ copy.affiliation }}</span>
              <span>{{ copy.university }}</span>
            </div>
            <p class="hero__tagline">{{ copy.tagline }}</p>
            <div class="hero__actions" :aria-label="copy.navLabel">
              <a class="button button--primary" :href="links.cv" target="_blank" rel="noopener">CV</a>
              <a class="button" :href="links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a class="button" :href="links.scholar" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            </div>
          </div>

          <figure class="portrait-frame">
            <img src="/portrait.webp" :alt="copy.photoAlt" width="720" height="900" fetchpriority="high">
          </figure>
        </div>
      </section>

      <section id="about" class="page-section content-width" aria-labelledby="about-title">
        <header class="section-header">
          <span class="section-index" aria-hidden="true">01</span>
          <h2 id="about-title">{{ copy.sections.about }}</h2>
        </header>
        <div class="about-grid">
          <div class="prose">
            <p v-for="paragraph in copy.about" :key="paragraph">{{ paragraph }}</p>
          </div>
          <aside class="profile-facts">
            <div>
              <h3>{{ copy.researchLabel }}</h3>
              <ul class="tag-list">
                <li v-for="item in copy.research" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div>
              <h3>{{ copy.profileLabel }}</h3>
              <ul class="inline-list">
                <li v-for="item in copy.profile" :key="item">{{ item }}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="publications" class="page-section page-section--tinted" aria-labelledby="publications-title">
        <div class="content-width">
          <header class="section-header">
            <span class="section-index" aria-hidden="true">02</span>
            <div>
              <h2 id="publications-title">{{ copy.sections.publications }}</h2>
              <p class="section-note">{{ copy.publicationNote }}</p>
            </div>
          </header>

          <div v-for="group in publicationGroups" :key="group.year" class="publication-year">
            <h3>{{ group.year }}</h3>
            <ol>
              <li v-for="publication in group.items" :key="publication.title" class="publication">
                <div class="publication__heading">
                  <span class="venue-badge">{{ publication.venue }}</span>
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
        </div>
      </section>

      <section id="education" class="page-section content-width" aria-labelledby="education-title">
        <header class="section-header">
          <span class="section-index" aria-hidden="true">03</span>
          <h2 id="education-title">{{ copy.sections.education }}</h2>
        </header>
        <div class="timeline">
          <article v-for="item in copy.education" :key="item.institution" class="timeline-item">
            <div class="timeline-item__marker" aria-hidden="true"></div>
            <p class="timeline-item__period">{{ item.period }}</p>
            <h3>{{ item.institution }}</h3>
            <p class="timeline-item__role">{{ item.degree }}</p>
            <p v-if="item.unit" class="timeline-item__unit">{{ item.unit }}</p>
            <ul v-if="item.notes.length" class="compact-list">
              <li v-for="note in item.notes" :key="note">{{ note }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="experience" class="page-section page-section--tinted" aria-labelledby="experience-title">
        <div class="content-width">
          <header class="section-header">
            <span class="section-index" aria-hidden="true">04</span>
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
        </div>
      </section>

      <section id="honors" class="page-section content-width" aria-labelledby="awards-title">
        <header class="section-header">
          <span class="section-index" aria-hidden="true">05</span>
          <h2 id="awards-title">{{ copy.sections.awards }}</h2>
        </header>
        <div class="honors-grid">
          <ul class="award-list">
            <li v-for="award in copy.awards" :key="award">{{ award }}</li>
          </ul>
          <div class="service-column">
            <div>
              <h3>{{ copy.sections.service }}</h3>
              <p v-for="item in copy.service" :key="item">{{ item }}</p>
            </div>
            <div>
              <h3>{{ copy.sections.patent }}</h3>
              <p class="patent-title" lang="zh-CN">{{ copy.patentTitle }}</p>
              <p class="muted">{{ copy.patentStatus }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="contact-section" aria-labelledby="contact-title">
        <div class="content-width contact-section__inner">
          <div>
            <span class="section-index section-index--light" aria-hidden="true">06</span>
            <h2 id="contact-title">{{ copy.sections.contact }}</h2>
            <p>{{ copy.contactLead }}</p>
          </div>
          <div class="contact-links">
            <a href="mailto:pangkehan@buaa.edu.cn">{{ copy.emailLabel }} <span>pangkehan@buaa.edu.cn</span></a>
            <a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub <span>KehanPang</span></a>
            <a :href="links.scholar" target="_blank" rel="noopener noreferrer">Google Scholar <span>Profile</span></a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="content-width">
        <span>© {{ currentYear }} Kehan Pang</span>
        <span>{{ copy.updated }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { content, languages, links, publications } from '../data/content'

export default {
  name: 'AcademicHomepage',
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
    publicationGroups () {
      return ['2026', '2025', '2024'].map(year => ({
        year,
        items: publications.filter(publication => publication.year === year)
      }))
    },
    currentYear () {
      return 2026
    }
  },
  methods: {
    switchLanguage (event, path) {
      if (typeof window === 'undefined') return
      event.preventDefault()
      window.location.assign(`${path}${window.location.hash}`)
    }
  }
}
</script>

<style src="../styles/theme.css"></style>
