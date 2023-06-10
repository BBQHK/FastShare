<template>
  <q-page class="main">
    <div class="row">
      <div class="col-md-10 offset-md-1">

        <div class="row">
          <div class=".col">
            <q-card class="share-card">
              <q-card-section class="text-black">
                <div class="text-h6 text-weight-bolder">Share</div>
              </q-card-section>

              <q-card-section>
                <q-file color="pink-13" filled v-model="model" label="Drop or select files here" multiple>
                  <template v-if="model" v-slot:append>
                    <q-icon name="cancel" @click.stop.prevent="model = null" class="cursor-pointer"></q-icon>
                  </template>
                </q-file>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat>Upload</q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="receive-card">
              <q-card-section class="text-black">
                <div class="text-h6 text-weight-bolder">Receive</div>
              </q-card-section>
              <q-card-section>
                <q-input color="pink-13" filled v-model="ReceiveCode" label="Enter code here" />
              </q-card-section>
              <q-separator />

              <q-card-actions align="right">
                <q-btn flat>Downlaod</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class=".col">
            <q-img style="width: 500px;" src="..\assets\logo.png" />
            <div class="text-h5" style="margin-left: 40px;">
              Share and download files easily with FastShare, your go-to file sharing platform.
            </div>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<style scoped>
.share-card, .receive-card {
  margin: 10px;
  height: 200px;
  width: 350px;
}

.share-card{
  margin-top: 100px;
}

.main {
  /* background-color: rgb(91, 39, 187); */
  background-color: rgb(218, 218, 218);
}
</style>

<script setup>
import { ref } from 'vue'

const model = ref(null);
const ReceiveCode = ref('');

</script>
