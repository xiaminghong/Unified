<template>
	<div>
		<main-sidebar />
    <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
      <main-content />
    </div>
	</div>
</template>

<script>
  import MainSidebar from './main-sidebar'
  import MainContent from './main-content'
  export default {
    components: {
      MainSidebar,
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