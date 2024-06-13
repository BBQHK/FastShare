import React from "react";
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
            <img
                src="https://readme-typing-svg.demolab.com?font=Tiny5&duration=1000&pause=1000&color=000000&multiline=true&repeat=false&random=false&width=410&height=100&lines=Share+and+download+files+easily+with+FastShare%2C+;your+go-to+file+sharing+platform."
                style={{ paddingLeft: "45px" }}
                alt="Typing SVG"
            />
            <img
                src="https://readme-typing-svg.demolab.com?font=Tiny5&pause=1000&color=000000&random=false&width=435&lines=Do-Re-Mi-Fa-So-La-Ti-Do"
                style={{ paddingLeft: "45px" }}
                alt="Typing SVG"
            />
        </Container>
    );
};

export default Intro;
