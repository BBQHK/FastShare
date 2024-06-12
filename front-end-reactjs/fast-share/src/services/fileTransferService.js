const API_URL = process.env.REACT_APP_API_URL;
const API_ROOT = process.env.REACT_APP_API_ROOT;

export function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    return fetch(`http://${API_URL}${API_ROOT}/api/files/upload/`, {
        method: "POST",
        body: formData,
    });
}

export function cancelUpload(fileID, receiveCode) {
    const formData = new FormData();
    formData.append("file_id", fileID);
    formData.append("receive_Code", receiveCode);
    return fetch(`http://${API_URL}${API_ROOT}/api/files/cancel-upload/`, {
        method: "POST",
        body: formData,
    });
}

export function downloadFileByReceiveCode(receiveCode) {
    return fetch(
        `http://${API_URL}${API_ROOT}/api/files/${receiveCode}/download`,
        {
            method: "GET",
            responseType: "blob",
        }
    );
}
