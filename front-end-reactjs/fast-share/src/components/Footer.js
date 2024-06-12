// Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";
import icon from "../assets/icon.png";

const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                position: "fixed",
                bottom: 0,
                backgroundColor: "#f5f5f5",
                padding: "10px 0",
                textAlign: "center",
                display: "flex",
                justifyContent: "flex-end", // Change this line
                alignItems: "center",
            }}
        >
            <img
                src={icon}
                alt="logo"
                style={{ width: "40px", marginRight: "10px" }}
            />
            <Typography
                variant="body2"
                sx={{
                    marginRight: "10px",
                }}
            >
                © 2024 FastShare. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
