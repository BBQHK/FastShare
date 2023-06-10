<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <MainFooter />

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MainHeader from 'components/MainHeader.vue'
import MainFooter from 'components/MainFooter.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainHeader,
    MainFooter
  },
})
</script>
