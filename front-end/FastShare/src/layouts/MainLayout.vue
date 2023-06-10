<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <MainFooter />

  </q-layout>
</template>

<script setup>
import MainHeader from 'components/MainHeader.vue'
import MainFooter from 'components/MainFooter.vue'

</script>
