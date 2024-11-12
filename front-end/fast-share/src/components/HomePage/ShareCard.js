import React from "react";
import { Box, CardContent, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import UploadIcon from "@mui/icons-material/Upload";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { uploadFile } from "../../services/fileTransferService";
import "react-toastify/dist/ReactToastify.css";
import * as JSZip from "jszip";
import { useDropzone } from "react-dropzone";
import { showToast } from "../../utils/commonToast";

const ShareCard = ({
    toggleReceiveCodeCard,
    changeFileId,
    changeReceiveCode,
}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
        useDropzone({
            noClick: true,
            noKeyboard: true,
            onDrop: (acceptedFiles) => {
                setSelectedFiles(acceptedFiles);
            },
        });

    const removeFile = (path) => {
        setSelectedFiles(selectedFiles.filter((file) => file.path !== path));
    };

    const files = selectedFiles.map((file) => (
        <li
            key={file.path}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#F7F7F7",
            }}
        >
            <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#4A4A4A" }}>
                    {file.path}
                </p>
                <p style={{ margin: 0, color: "#9B9B9B" }}>
                    {(file.size / 1024).toFixed(2)} KB
                </p>
            </div>
            <IconButton
                onClick={() => removeFile(file.path)}
                style={{ color: "red" }}
            >
                <CloseIcon />
            </IconButton>
        </li>
    ));

    const handleUpload = async () => {
        let files = selectedFiles;

        if (files.length === 0) {
            showToast("error", "Please select a file to upload");
            return;
        }

        // if files item more than 1, zip them together and put the zip file into files
        if (files.length > 1) {
            files = [await generateZipFile(files)];
        }

        try {
            const response = await uploadFile(files[0]);
            const data = await response.json();
            if (!response.ok) {
                showToast("error", "HTTP error " + response.status);
                throw new Error("HTTP error " + response.status);
            }
            showToast("success", data.message);

            changeFileId(data.id.toString());
            changeReceiveCode(data.receiveCode.toString());
            toggleReceiveCodeCard(true);
        } catch (e) {
            console.error("Error uploading file: ", e);
        }
    };

    const generateZipFile = async (files) => {
        const zip = new JSZip();
        files.forEach((file) => {
            zip.file(file.name, file);
        });

        // Use async/await to wait for zip generation to complete
        const content = await zip.generateAsync({ type: "blob" });
        return new File([content], "files.zip");
    };

    return (
        <Card variant="outlined" sx={{ marginBottom: 2, width: 400 }}>
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                >
                    Share
                </Typography>
                <Box sx={{ marginTop: 2, marginBottom: 2 }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "30px",
                            border: isDragActive
                                ? "2px dashed #4A90E2"
                                : "2px dashed #D9D9D9",
                            borderRadius: "5px",
                            backgroundColor: isDragActive
                                ? "#E8F4FD"
                                : "#F7F7F7",
                            color: "#BDBDBD",
                            fontSize: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                        onClick={open}
                    >
                        <p>Drag & Drop files here or</p>
                        <p
                            style={{
                                color: "#4A90E2",
                                textDecoration: "underline",
                            }}
                        >
                            Browse files
                        </p>
                    </div>
                </Box>
                {files.length > 0 && (
                    <aside>
                        <h4 style={{ color: "#4A4A4A", marginBottom: "10px" }}>
                            Selected Files
                        </h4>
                        <ul
                            style={{
                                listStyleType: "none",
                                padding: 0,
                                maxHeight: "100px",
                                overflowY: "auto",
                            }}
                        >
                            {files}
                        </ul>
                    </aside>
                )}
            </CardContent>
            <Divider />
            <CardContent style={{ padding: 10 }}>
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "transparent",
                            color: "#000000",
                            border: "2px solid #000000",
                            boxShadow: "none",
                            fontWeight: "bold",
                        }}
                        onClick={() => handleUpload()}
                    >
                        <UploadIcon />
                        UPLOAD
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ShareCard;
