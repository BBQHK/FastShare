<template>
  <q-page class="main">
    <div class="row">
      <div class="col-md-10 offset-md-1">

        <div class="row">
          <div class=".col">
            <q-card class="share-card">
              <template v-if="receive_code_show">
                <q-card-section class="text-black">
                  <div class="row">
                    <q-btn flat round dense icon="arrow_back" @click="receive_code_show = false" />
                    <div class="text-h6 text-weight-bolder">Waiting...</div>
                    <div>Enter the 6-digit key on the receiving device</div>
                    <div>Expires in <span style="color: red;">{{ expire_time }}</span></div>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="key-box text-center" @click="copyCode">
                    <span v-for = "(digit, index) in receive_code" :key="index">{{ digit }}</span>
                  </div>
                </q-card-section>

              </template>
              <template v-else>
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
                  <q-btn flat @click="receive_code_show=true">Upload</q-btn>
                </q-card-actions>
              </template>
            </q-card>

            <q-card class="receive-card">
              <q-card-section class="text-black">
                <div class="text-h6 text-weight-bolder">Receive</div>
              </q-card-section>
              <q-card-section>
                <q-input color="pink-13" filled v-model="ReceiveCodeInput" label="Enter code here" />
              </q-card-section>
              <q-separator />

              <q-card-actions align="right">
                <q-btn flat>Downlaod</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col">
            <div style="margin-top: 70px; margin-left: 50px;">
              <q-img style="width: 500px;" src="..\assets\logo.png" />
              <div class="text-h5" style="margin-left: 40px;">
                Share and download files easily with FastShare, your go-to file sharing platform.
              </div>
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
  /* height: 200px; */
  width: 350px;
}

.share-card{
  margin-top: 100px;
}

.key-box{
  cursor: pointer;
}

.key-box > span {
  color: #333;
  background-color: #fafafa;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 0 2px;
  display: inline-block;
  width: 40px;
  line-height: 64px;
}

.main {
  background-color: rgb(218, 218, 218);
}
</style>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar';

const model = ref(null);
const ReceiveCodeInput = ref('');
const receive_code_show = ref(true);
const receive_code = ref('226688');
const expire_time = ref('10:00');

const copyCode = () => {
  navigator.clipboard.writeText(receive_code.value);
  Notify.create({
    icon: 'content_copy',
    message: 'Copied to clipboard',
    color: 'deep-orange-5',
    position: 'top'
  });
}

</script>
