import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Intro from "../components/Intro";
import ShareCard from "../components/HomePage/ShareCard";
import ReceiveCard from "../components/HomePage/ReceiveCard";
import ReceiveCodeCard from "../components/HomePage/ReceiveCodeCard";
import TransferSuccessCard from "../components/HomePage/TransferSuccessCard";

const HomePage = () => {
    const [showReceiveCodeCard, setShowReceiveCodeCard] = useState(false);
    const [showTransferSuccessCard, setShowTransferSuccessCard] =
        useState(false);
    const [fileId, setFileId] = useState("");
    const [receiveCode, setReceiveCode] = useState("000000");

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
                    {showTransferSuccessCard ? (
                        <TransferSuccessCard
                            toggleReceiveCodeCard={(showOrNot) =>
                                setShowReceiveCodeCard(showOrNot)
                            }
                            toggleTransferSuccessCard={(showOrNot) =>
                                setShowTransferSuccessCard(showOrNot)
                            }
                        />
                    ) : showReceiveCodeCard ? (
                        <ReceiveCodeCard
                            toggleReceiveCodeCard={(showOrNot) =>
                                setShowReceiveCodeCard(showOrNot)
                            }
                            toggleTransferSuccessCard={(showOrNot) =>
                                setShowTransferSuccessCard(showOrNot)
                            }
                            id={fileId}
                            code={receiveCode}
                        />
                    ) : (
                        <ShareCard
                            toggleReceiveCodeCard={(showOrNot) =>
                                setShowReceiveCodeCard(showOrNot)
                            }
                            changeFileId={(newId) => setFileId(newId)}
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
