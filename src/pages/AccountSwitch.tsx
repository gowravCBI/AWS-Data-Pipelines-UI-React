import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Divider,
  CardContent,
  Stack,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/Login.png";
import { useSnackbar } from "../components/Snackbar";
import { AWSCredentials } from "../services/types";
import theme from "../theme";

function AccountSwitch() {
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: "",
  });

  const [formData, setFormData] = useState<AWSCredentials>({
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: "",
  });

  // Handle input changes
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page refresh

    // Trim inputs to remove any surrounding spaces
    const trimmedData = {
      accessKeyId: formData.accessKeyId.trim(),
      secretAccessKey: formData.secretAccessKey.trim(),
      sessionToken: formData.sessionToken.trim(),
    };

    const newErrors = {
      accessKeyId: "",
      secretAccessKey: "",
      sessionToken: "",
    };

    // Validate AWS Access Key ID
    if (!/^[A-Z0-9]{20}$/.test(trimmedData.accessKeyId)) {
      newErrors.accessKeyId = "AWS Access Key ID must be exactly 20 uppercase alphanumeric characters.";
    }

    // Validate AWS Secret Access Key
    if (!/^[A-Za-z0-9/+=]{40}$/.test(trimmedData.secretAccessKey)) {
      newErrors.secretAccessKey = "AWS Secret Access Key must be exactly 40 characters long.";
    }

    // Validate AWS Session Token
    if (!/^[A-Za-z0-9/+=]+$/.test(trimmedData.sessionToken)) {
      newErrors.sessionToken = "AWS Session Token contains invalid characters.";
    }

    setErrors(newErrors);

    // Stop submission if there are errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setLoading(true);
    try {
      // Simulate successful submission
      console.log("Form data:", trimmedData);
      showSnackbar("Account switch successful!", "success");
      navigate("/pipeline/list");
    } catch (err) {
      // setError("An error occurred. Please try again.", err);
      showSnackbar("Failed to switch account", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (loading) {
      return; // Do nothing if loading
    }
    // Shift + Enter allows inserting a newline.
    // Enter alone submits the form.
    if (e.key === "Enter" && !e.shiftKey) { // Check if Enter is pressed without Shift
      e.preventDefault(); // Prevent newline insertion
      const form = (e.target as HTMLInputElement).closest("form");
      if (form) {
        // form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        background:
          "linear-gradient(45deg, #224958 0%, #1a4040 30%, #163133 70%, #1e4642 100%)",
        p: 3,
      }}
    >
      <Card
        sx={{
          height: "70vh",
          maxWidth: "75vw",
          width: "100%",
          boxShadow: 12,
          borderRadius: 5,
          p: 1,
          display: "flex", // To align image and form in row
          flexDirection: { xs: "column", sm: "row" }, // Column for smaller screens, row for larger
          bgcolor: theme.palette.background.default,
        }}
      >
        {/* Image Section - Hide on small screens */}
        <Box
          sx={{
            width: { xs: "0", sm: "50%" }, // Hide image on small screens (xs)
            height: "100%", // Make the image fill the entire height of the card
            backgroundImage: `url(${LoginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1rem 0 0 1rem", // Rounded corners for the image
            display: { xs: "none", sm: "block" }, // Hide image on small screens (xs)
          }}
        />
        {/* Divider between Image and Form */}
        <Divider
          sx={{
            display: { xs: "none", sm: "block" }, // Show divider only on larger screens
            height: "100%",
            width: "1px", // Divider thickness
            backgroundColor: "#ccc", // Divider color
          }}
        />

        {/* Form Section */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", sm: "50%" }, // 100% width for smaller screens, 50% for larger
            height: "100%", // Make the form section fill the remaining height
            overflow: "auto", // Prevent content overflow
          }}
        >
          <Typography
            variant="h4"
            mb={2}
            align="center"
            color="primary"
            fontWeight="bold"
          >
            Sign In to Access AWS Data Pipelines
          </Typography>

          <Divider sx={{ width: "90%" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
              width: "100%",
              padding: { xs: "15px 20px", sm: "20px 30px" },
            }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} mb={2}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    id="accessKeyId"
                    name="accessKeyId"
                    label="AWS Access Key ID"
                    variant="outlined"
                    value={formData.accessKeyId}
                    onChange={handleChange}
                    required
                    fullWidth
                    size="small"
                    error={Boolean(errors.accessKeyId)}
                    helperText={errors.accessKeyId}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    id="secretAccessKey"
                    name="secretAccessKey"
                    label="AWS Secret Access Key"
                    variant="outlined"
                    value={formData.secretAccessKey}
                    onChange={handleChange}
                    required
                    fullWidth
                    size="small"
                    error={Boolean(errors.secretAccessKey)}
                    helperText={errors.secretAccessKey}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    multiline
                    maxRows={3}
                    id="sessionToken"
                    name="sessionToken"
                    label="AWS Session Token"
                    variant="outlined"
                    value={formData.sessionToken}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    required
                    fullWidth
                    size="small"
                    error={Boolean(errors.sessionToken)}
                    helperText={errors.sessionToken}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  size="small"
                  startIcon={loading && <CircularProgress size={16} />}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Stack>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AccountSwitch;
