import React from "react";
import { Box, CardContent, TextField, Typography, Button } from "@mui/material";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import { useState } from "react";
import Divider from "@mui/material/Divider";

const ShareCard = ({ toggleReceiveCodeCard, changeReceiveCode }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            // Handle the file upload logic here
            console.log("Uploading files:", selectedFiles);
        } else {
            console.log("No files selected");
        }
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
            <CardContent>
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "#ff2b40",
                            color: "#FFFFFF",
                            width: "120px",
                        }}
                        onClick={() => toggleReceiveCodeCard(true)}
                    >
                        UPLOAD
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ShareCard;
