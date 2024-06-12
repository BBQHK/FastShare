import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Intro from "../components/Intro";
import ShareCard from "../components/ShareCard";
import ReceiveCard from "../components/ReceiveCard";
import ReceiveCodeCard from "../components/ReceiveCodeCard";

const HomePage = () => {
    const [showReceiveCodeCard, setShowReceiveCodeCard] = useState(false);
    const [receiveCode, setReceiveCode] = useState("123456");

    return (
        <Container maxWidth={false} style={{ margin: "50px 0px" }}>
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={5}
                    container
                    direction="column"
                    alignItems="flex-end"
                >
                    {showReceiveCodeCard ? (
                        <ReceiveCodeCard
                            toggleReceiveCodeCard={(showOrNot) =>
                                setShowReceiveCodeCard(showOrNot)
                            }
                            code={receiveCode}
                        />
                    ) : (
                        <ShareCard
                            toggleReceiveCodeCard={(showOrNot) =>
                                setShowReceiveCodeCard(showOrNot)
                            }
                            changeReceiveCode={(newCode) =>
                                setReceiveCode(newCode)
                            }
                        />
                    )}
                    <ReceiveCard />
                </Grid>
                <Grid item xs={7}>
                    <Intro />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
