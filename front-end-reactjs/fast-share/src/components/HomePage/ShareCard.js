import React from "react";
import { Box, CardContent, TextField, Typography, Button } from "@mui/material";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import UploadIcon from "@mui/icons-material/Upload";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { uploadFile } from "../../services/fileTransferService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as JSZip from "jszip";

const ShareCard = ({
    toggleReceiveCodeCard,
    changeFileId,
    changeReceiveCode,
}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleUpload = async () => {
        let files = selectedFiles;

        // if files item more than 1, zip them together and put the zip file into files
        if (files.length > 1) {
            files = [await generateZipFile(files)];
        }

        try {
            const response = await uploadFile(files[0]);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            toast.success("File has been uploaded successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            const data = await response.json();
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
                <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                    <Input
                        type="file"
                        inputProps={{ multiple: true }}
                        onChange={handleFileChange}
                        sx={{ display: "none" }}
                        id="file-input"
                    />
                    <label htmlFor="file-input">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Select files here"
                            InputProps={{
                                readOnly: true,
                                style: {
                                    backgroundColor: "#f5f5f5",
                                    cursor: "pointer",
                                },
                            }}
                            value={selectedFiles
                                .map((file) => file.name)
                                .join(", ")}
                            onClick={() =>
                                document.getElementById("file-input").click()
                            }
                        />
                    </label>
                </Box>
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
