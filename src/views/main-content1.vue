<template>
	<div>
    <div class="site-content__wrapper--sp site-content" :style="{ 'height': (documentClientHeight-66) + 'px' }">
      <router-view />
    </div>
	</div>
</template>

<script>
  import MainContent from './main-content'
  export default {
    components: {
      MainContent
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight },
        set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
      }
    },
    mounted () {
      this.resetDocumentClientHeight()
    },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight () {
        this.documentClientHeight = document.documentElement['clientHeight']
        window.onresize = () => {
          this.documentClientHeight = document.documentElement['clientHeight']
        }
      }
    }
  }
</script>