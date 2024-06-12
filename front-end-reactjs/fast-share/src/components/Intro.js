import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../assets/logo.png";

const Intro = () => {
    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "center",
            }}
        >
            <img src={logo} alt="logo" style={{ width: "500px" }} />
            <Typography
                variant="h5"
                gutterBottom
                style={{ paddingLeft: "45px" }}
            >
                Share and download files easily with FastShare, your go-to file
                sharing platform.
            </Typography>
        </Container>
    );
};

export default Intro;
