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
                <Typography variant="h2" align="center" gutterBottom>
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
                            FastShare is a side project aimed at building a file
                            sharing platform similar to Send Anywhere.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The platform is implemented using React.js and
                            Django, leveraging the strengths of these
                            technologies to provide a robust and efficient
                            service.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our goal is to enable users to share files in the
                            simplest way possible, reducing the complexity often
                            associated with file sharing.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We're always open to feedback and suggestions. If
                            you have any ideas or questions about our project,
                            feel free to reach out to us. We'd love to hear from
                            you!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Thank you for your interest in FastShare. We hope
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
