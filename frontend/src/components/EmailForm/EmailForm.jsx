import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TONE_OPTIONS } from "../../utils/constants";

const EmailForm = ({
  emailContent,
  setEmailContent,
  tone,
  setTone,
  loading,
  handleSubmit,
}) => (
  <Box sx={{ px: { xs: 0, sm: 2 } }}>
    <TextField
      fullWidth
      multiline
      rows={6}
      variant="outlined"
      label="Paste the original email here..."
      value={emailContent}
      onChange={(e) => setEmailContent(e.target.value)}
      sx={{
        mb: 3,
        backgroundColor: "#ffffff",
        borderRadius: 2,
      }}
    />
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel htmlFor="tone-select">Tone (optional)</InputLabel>
      <Select
        id="tone-select"
        data-testid="tone-select"
        value={tone}
        label="Tone (optional)"
        onChange={(e) => setTone(e.target.value)}
        sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
      >
        {TONE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={!emailContent || loading}
      fullWidth
      sx={{
        py: 1.5,
        fontWeight: 600,
        fontSize: "1rem",
        borderRadius: 2,
        textTransform: "none",
      }}
    >
      {loading ? <CircularProgress size={24} /> : "✨ Generate Reply"}
    </Button>
  </Box>
);

export default EmailForm;
