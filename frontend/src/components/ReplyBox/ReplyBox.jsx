import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const ReplyBox = ({ generatedReply }) => (
  <Box sx={{ mt: 5, px: { xs: 0, sm: 2 } }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
      📝 Your AI-Generated Reply:
    </Typography>
    <TextField
      fullWidth
      multiline
      rows={6}
      variant="outlined"
      value={generatedReply}
      inputProps={{ readOnly: true }}
      sx={{
        backgroundColor: "#f1f5f9",
        borderRadius: 2,
        mb: 2,
      }}
    />
    <Button
      variant="outlined"
      onClick={() => navigator.clipboard.writeText(generatedReply)}
      sx={{
        textTransform: "none",
        fontWeight: 500,
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "#e2e8f0",
        },
      }}
    >
      📋 Copy to Clipboard
    </Button>
  </Box>
);

export default ReplyBox;
