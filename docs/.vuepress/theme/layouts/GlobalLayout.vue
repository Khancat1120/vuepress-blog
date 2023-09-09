<template>
  <div>
    <GlobalLayout></GlobalLayout>
    <div class="home"> <!-- set this class to allow our footer to look like the 'normal' homepage's footer -->
      <div class="footer">
        <NavLink :item="privacy"/>
        <!-- <NavLink :item="imprint"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import GlobalLayout from '@vuepress/core/lib/client/components/GlobalLayout.vue'
import NavLink from '@parent-theme/components/NavLink.vue'

export default {
  components: {
    GlobalLayout,
    NavLink
  },
  computed: {
    privacy() {
      return { id: 'privacy', text: 'Please contact me if you have any question about this page or this blog.', link: 'https://github.com/Khancat1120/Khancat1120.github.io/issues', }
    },
    // imprint() {
    //   return { id: 'imprint', text: 'Imprint', link: '/imprint/', }
    // }
  },
}
</script>