import React, { useState } from "react";
import { Box, CardContent, TextField, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import "./ReceiveCodeCard.css"; // Import the CSS file
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const ReceiveCodeCard = ({ toggleReceiveCodeCard, code }) => {
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
                        onClick={() => toggleReceiveCodeCard(false)}
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
                    Expires in <span style={{ color: "red" }}>00:00</span>
                </Typography>
            </CardContent>
            <CardContent>
                <div className="key-box">
                    {code.split("").map((digit, index) => (
                        <span key={index}>{digit}</span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReceiveCodeCard;
