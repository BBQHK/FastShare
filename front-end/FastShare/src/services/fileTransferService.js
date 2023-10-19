import { api } from 'boot/axios';

const uploadFile = async (file) => {
    const response = await api({
        url: `/api/files/upload/`,
        method: 'post',
        data: {
          file: file,
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return response;
}

const cancelUpload = async (fileID, receiveCode) => {
    const response = await api({
        url: `/api/files/cancel-upload/`,
        method: 'post',
        data: {
          file_id: fileID,
          receive_Code: receiveCode,
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return response;
}

const downloadFileByReceiveCode = async (receiveCode) => {
    const response = await api({
        url: `/api/files/${receiveCode}/download/`,
        method: 'get',
        responseType: 'blob', // Specify the response type as 'blob' to handle binary data
    })
    return response;
}

// export all functions
export {
    uploadFile,
    cancelUpload,
    downloadFileByReceiveCode,
}