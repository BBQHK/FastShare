import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import icon from "../assets/icon.png";

const StyledImage = styled("img")(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
}));

const AboutPage = () => {
    return (
        <Box>
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                    About Me
                </Typography>
                <Grid container spacing={4}>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <StyledImage
                            alt="FastShare Icon"
                            src={icon} // Replace with the actual image URL
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="body1" paragraph>
                            Welcome to our project! This project is a
                            collaborative effort of a group of passionate
                            developers who aim to create innovative solutions
                            for modern problems.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our project leverages the latest technologies in the
                            industry, including React, Node.js, and MongoDB, to
                            deliver a seamless and efficient user experience.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We believe in the power of technology to transform
                            lives and industries. Through this project, we hope
                            to contribute to the tech community and make a
                            positive impact.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We're always open to feedback and suggestions. If
                            you have any ideas or questions about our project,
                            feel free to reach out to us. We'd love to hear from
                            you!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Thank you for your interest in our project. We hope
                            you find it useful and look forward to your
                            continued support.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutPage;
