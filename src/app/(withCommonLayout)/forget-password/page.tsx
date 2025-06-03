"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import { useForgetPasswordMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeUser } from "@/services/auth.services";
import CheckIcon from "@mui/icons-material/Check";

// ✅ Zod schema that validates either a valid email or Bangladeshi phone number
const forgetPasswordSchema = z.object({
  emailOrPhoneNumber: z
    .string()
    .trim()
    .refine(
      (val) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ||
        /^01[3-9]\d{8}$/.test(val),
      {
        message: "Must be a valid email or Bangladeshi phone number",
      }
    ),
});

const ForgetPasswordPage = () => {
  const [forgetPassword, { isSuccess }] = useForgetPasswordMutation();
  const router = useRouter();

  const handleOnSubmit = async (data: any) => {
    const isPhone = /^01[3-9]\d{8}$/.test(data.emailOrPhoneNumber);
    const body = isPhone
      ? { phoneNumber: data.emailOrPhoneNumber }
      : { email: data.emailOrPhoneNumber };

    try {
      const res = await forgetPassword({ body }).unwrap();
      console.log("Forget Password Response:", res);
      if (res) {
        toast.success("Password reset link sent successfully!");
      }
    } catch (error) {
      console.error("Forget Password Error:", error);
      toast.error("Failed to send reset link. Try again.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", height: "80vh", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 3,
          bgcolor: "white",
          boxShadow: "0px 12px 20px rgba(0,0,0,0.05)",
          backgroundImage: "linear-gradient(to bottom right, #f0f4ff, #e0eafc)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          🔒 Forgot Your Password?
        </Typography>

        {isSuccess && (
          <Box>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
             Check your email or phone number for the reset link.
            </Alert>
          </Box>
        )}

        {!isSuccess && (
          <HmForm
            onSubmit={handleOnSubmit}
            resolver={zodResolver(forgetPasswordSchema)}
            defaultValues={{ emailOrPhoneNumber: "" }}
          >
            <Grid2 size={6}>
              <HmInput
                name="emailOrPhoneNumber"
                label="Email or Phone Number"
                type="text"
              />
            </Grid2>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: "#3f51b5",
                "&:hover": {
                  bgcolor: "#2c387e",
                },
              }}
            >
              Send Reset Link
            </Button>
          </HmForm>
        )}
      </Box>
    </Container>
  );
};

export default ForgetPasswordPage;
