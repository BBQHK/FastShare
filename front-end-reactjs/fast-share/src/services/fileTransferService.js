const API_URL = process.env.REACT_APP_API_URL;
const API_ROOT = process.env.REACT_APP_API_ROOT;

export function downloadFileByReceiveCode(receiveCode) {
    return fetch(`${API_URL}${API_ROOT}/api/files/${receiveCode}/download`, {
        method: "GET",
        responseType: "blob",
    });
}
