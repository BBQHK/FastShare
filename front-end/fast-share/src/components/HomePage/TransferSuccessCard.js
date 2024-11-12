import React from "react";
import { Box, CardContent, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ReplayIcon from "@mui/icons-material/Replay";

const TransferSuccessCard = ({
    toggleReceiveCodeCard,
    toggleTransferSuccessCard,
}) => {
    const handleShareAgainButtonClick = () => {
        // Reset the state
        toggleReceiveCodeCard(false);
        toggleTransferSuccessCard(false);
    };
    return (
        <Card variant="outlined" sx={{ marginBottom: 2, width: 400 }}>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                    >
                        Share
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
                    <ConnectWithoutContactIcon
                        style={{ fontSize: 100, color: "#ff2b40" }}
                    />
                    <Typography
                        variant="h5"
                        sx={{ marginTop: 2, fontWeight: "bold" }}
                    >
                        Transfer successful!
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardContent style={{ padding: 10 }}>
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "transparent",
                            color: "#000000",
                            // width: "140px",
                            border: "2px solid #000000",
                            boxShadow: "none",
                            fontWeight: "bold",
                        }}
                        onClick={handleShareAgainButtonClick}
                    >
                        <ReplayIcon />
                        SHARE AGAIN
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TransferSuccessCard;
