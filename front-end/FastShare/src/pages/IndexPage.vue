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
                    <q-btn flat round dense icon="arrow_back" @click="CancelUpload" />
                    <div class="text-h6 text-weight-bolder">Receive Code</div>
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
                  <q-file color="deep-orange-6" filled v-model="file_model" label="Drop or select files here" multiple>
                    <template v-if="file_model" v-slot:append>
                      <q-icon name="cancel" @click.stop.prevent="file_model = null" class="cursor-pointer"></q-icon>
                    </template>
                  </q-file>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn flat @click="handleUpload">Upload</q-btn>
                </q-card-actions>
              </template>
            </q-card>

            <q-card class="receive-card">
              <q-card-section class="text-black">
                <div class="text-h6 text-weight-bolder">Receive</div>
              </q-card-section>
              <q-card-section>
                <q-input color="deep-orange-6" filled v-model="ReceiveCodeInput" label="Enter code here" />
              </q-card-section>
              <q-separator />

              <q-card-actions align="right">
                <q-btn flat @click="handleDownload(); ReceiveCodeInput = '';">Downlaod</q-btn>
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
import { api } from 'boot/axios';

const file_model = ref(null);
const ReceiveCodeInput = ref('');
const receive_code_show = ref(false);
const receive_code = ref('000000');
const expire_time = ref('00:00');
let interval;

const CancelUpload = () => {
  receive_code_show.value = false;
  clearInterval(interval);
  Notify.create({
    icon: 'cancel',
    message: 'Upload canceled!',
    color: 'negative',
    position: 'top'
  });
}

const handleUpload = () => {
  // get file from file_model
  const files = file_model.value;
  // console.log(files);
  api({
    url: `/api/files/upload/`,
    method: 'post',
    data: {
      file: files[0],
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    console.log(response.data.receiveCode);
    Notify.create({
      icon: 'cloud_upload',
      message: 'File uploaded!',
      color: 'green-5',
      position: 'top'
    });
    receive_code_show.value = true;
    receive_code.value = response.data.receiveCode.toString();
  }).catch(error => {
    // Handle any error that occurred during the API request
    console.error('Error uploading the file:', error);
  });

  // set expire time
  expire_time.value = '10:00';

  // expire time countdown
  interval = setInterval(() => {
    const time = expire_time.value.split(':');
    let minutes = parseInt(time[0]);
    let seconds = parseInt(time[1]);

    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(interval);
        receive_code_show.value = false;
        Notify.create({
          icon: 'cancel',
          message: 'Receive code expired!',
          color: 'negative',
          position: 'top'
        });

        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    expire_time.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);

}

const handleDownload = () => {
  api({
    url: `/api/files/${ReceiveCodeInput.value}/download`,
    method: 'get',
    responseType: 'blob', // Specify the response type as 'blob' to handle binary data
  }).then(response => {
    const contentDispositionHeader = response.headers['content-disposition'];
    const fileNameMatch = contentDispositionHeader.match(/filename="(.+)"/);
    if (fileNameMatch && fileNameMatch[1]) {
      const fileName = fileNameMatch[1];

      // Create a temporary anchor element for downloading the file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Notify.create({
        icon: 'cloud_download',
        message: 'File downloaded!',
        color: 'green-5',
        position: 'top'
      });
    } else {
      // Handle the case where the file name is not provided in the response
      console.error('File name not found in the response');
    }
  }).catch(error => {
    // Handle any error that occurred during the API request
    console.error('Error downloading the file:', error);
  });
};

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
