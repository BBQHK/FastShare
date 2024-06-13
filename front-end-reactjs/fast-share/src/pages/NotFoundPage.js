import { styled } from "@mui/system";
import { Container, Typography, Button } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

const StyledContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
});

const StyledTypography = styled(Typography)({
    marginBottom: "20px",
});

function NotFoundPage() {
    return (
        <StyledContainer>
            <img
                src="https://readme-typing-svg.demolab.com?font=Tiny5&size=60&pause=1000&color=000000&repeat=false&random=false&width=550&height=100&lines=404+-+Page+Not+Found"
                alt="Typing SVG"
            />
            <Typography variant="subtitle1">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </Typography>
            <Button
                variant="contained"
                style={{
                    backgroundColor: "transparent",
                    color: "#000000",
                    border: "2px solid #000000",
                    boxShadow: "none",
                    fontWeight: "bold",
                }}
                sx={{
                    marginTop: "20px",
                }}
                component={LinkRouter}
                to="/"
            >
                Go to Home Page
            </Button>
        </StyledContainer>
    );
}

export default NotFoundPage;
