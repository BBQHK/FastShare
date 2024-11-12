import React, { useEffect, useState } from "react";
import { Box, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import "./ReceiveCodeCard.css"; // Import the CSS file
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import createWebSocketConnection from "../../services/websocket";
import { cancelUpload } from "../../services/fileTransferService";
import { showToast } from "../../utils/commonToast";

const ReceiveCodeCard = ({
    toggleReceiveCodeCard,
    toggleTransferSuccessCard,
    id,
    code,
}) => {
    const [expireTime, setExpireTime] = useState(10 * 60); // 10 minutes in seconds

    useEffect(() => {
        const socket = createWebSocketConnection(
            code,
            toggleTransferSuccessCard
        );

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setExpireTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(countdown);
                    toggleReceiveCodeCard(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleCancelButtonClick = async () => {
        const response = await cancelUpload(id, code);
        const data = await response.json();
        if (!response.ok) {
            showToast("error", data.message);
            console.error("Error cancelling upload");
        }
        showToast("info", data.message);
        toggleReceiveCodeCard(false);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        showToast("info", "Copied to clipboard");
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <Card variant="outlined" sx={{ marginBottom: 2, width: 400 }}>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{
                            marginRight: 1,
                        }}
                        onClick={handleCancelButtonClick}
                    >
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                    >
                        Receive Code
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Enter the 6-digit key on the receiving device.
                </Typography>
                <Typography variant="body2">
                    Expires in{" "}
                    <span style={{ color: "red" }}>
                        {formatTime(expireTime)}
                    </span>
                </Typography>
            </CardContent>
            <CardContent>
                <div className="key-box" onClick={copyCode}>
                    {code.split("").map((digit, index) => (
                        <span key={index}>{digit}</span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReceiveCodeCard;
