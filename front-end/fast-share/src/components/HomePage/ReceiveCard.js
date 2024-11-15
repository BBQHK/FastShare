import React from "react";
import { Box, CardContent, TextField, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadFileByReceiveCode } from "../../services/fileTransferService";
import { useState } from "react";
import { showToast } from "../../utils/commonToast";

const ReceiveCard = () => {
    const [receiveCode, setReceiveCode] = useState("");

    const handleReceiveCodeChange = (event) => {
        setReceiveCode(event.target.value);
    };

    const handleDownload = async () => {
        try {
            if (!receiveCode) {
                showToast("error", "Please enter a receive code");
                return;
            }
            const response = await downloadFileByReceiveCode(receiveCode);
            if (!response.ok) {
                showToast("error", "HTTP error " + response.status);
                throw new Error("HTTP error " + response.status);
            }
            showToast("success", "File download successfully");

            const contentDispositionHeader = response.headers.get(
                "content-disposition"
            );
            const utf8Prefix = "=?utf-8?b?";
            const fileNameMatch = contentDispositionHeader.startsWith(
                utf8Prefix
            )
                ? decodeURIComponent(
                      escape(
                          atob(
                              contentDispositionHeader.match(
                                  /utf-8\?b\?(.+)\?=/
                              )[1]
                          )
                      )
                  ).match(/filename="(.+)"/)
                : contentDispositionHeader.match(/filename="(.+)"/);

            if (!fileNameMatch) {
                throw new Error(
                    "Filename not found in content-disposition header"
                );
            }

            const [, fileName] = fileNameMatch;
            const blob = await response.blob();

            // Create a new object URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a link and click it to start the download
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.click();

            // Release the reference to the file by revoking the Object URL
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error(e);
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
                    Receive
                </Typography>
                <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter code here"
                        onChange={handleReceiveCodeChange}
                        value={receiveCode}
                        InputProps={{
                            style: { backgroundColor: "#f5f5f5" },
                        }}
                    />
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
                            // width: "140px",
                            border: "2px solid #000000",
                            boxShadow: "none",
                            fontWeight: "bold",
                        }}
                        onClick={() => {
                            handleDownload();
                            setReceiveCode("");
                        }}
                    >
                        <DownloadIcon />
                        DOWNLOAD
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ReceiveCard;
