import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import EmailForm from "./components/EmailForm/EmailForm";
import ReplyBox from "./components/ReplyBox/ReplyBox";
import { generateEmailReply } from "./api/email";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const reply = await generateEmailReply({ emailContent, tone });
      setGeneratedReply(
        typeof reply === "string" ? reply : JSON.stringify(reply)
      );
    } catch (error) {
      setError("Email generation failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 5,
        px: { xs: 2, sm: 4 },
        bgcolor: "#f9fafb",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600, color: "#1a202c", mb: 3 }}
      >
        Email Reply Generator
      </Typography>

      <EmailForm
        emailContent={emailContent}
        setEmailContent={setEmailContent}
        tone={tone}
        setTone={setTone}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      {error && (
        <Typography color="error" sx={{ mt: 3 }}>
          {error}
        </Typography>
      )}

      {generatedReply && <ReplyBox generatedReply={generatedReply} />}
    </Container>
  );
}

export default App;
