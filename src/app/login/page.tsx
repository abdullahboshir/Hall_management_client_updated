"use client";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import Progress from "@/components/Shared/Spinner/Progress";
import { UserLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Ensures the string is a valid email
    .min(2, "Email is required"), // Ensures the email is not empty

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long") // Minimum length of 6 characters
    .max(20, "Password must be at most 20 characters long") // Maximum length of 20 characters
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
    .regex(/[0-9]/, "Password must contain at least one number") // At least one number
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ), // At least one special character
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: FieldValues) => {
    setIsLoading(true);
    try {
    
      const res = await UserLogin(data);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo(res?.data?.accessToken);

        if (res?.data?.user?.role === "student") {
          router.push("/");
        } else if (res?.data?.user?.role === "manager") {
          router.push("/dining");
        } else {
          router.push(`/dashboard`);
        }
      } else {
        setError(res?.message);
      }
    } catch (error) {
      console.log("errorrrrrrrr", error);
    }


    setIsLoading(false);

  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={600} marginBottom={2}>
              Login
            </Typography>
          </Stack>

          {error && (
            <Box>
              <Typography variant="h6" color="red" marginBottom={3}>
                {typeof error === "string" && error.includes('ENOTFOUND ') ? "Network Error" : error}
              </Typography>
            </Box>
          )}

          <Box>
            <HmForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
            >
              <Grid2
                container
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid2 size={6}>
                  <HmInput name="email" label="Email" type="email" />
                </Grid2>

                <Grid2 size={6}>
                  <HmInput name="password" label="Password" type="password" />
                </Grid2>
              </Grid2>
              <Typography textAlign="end" sx={{ textDecoration: "underline" }}>
                <Link href="forget-password">Forgot Password?</Link>
              </Typography>
              <Button
                type="submit"
                sx={{ margin: "10px 0px" }}
                fullWidth={true}
              >
                          {
                                isLoading ? (
                                  <Typography display="flex" gap={1} color="white">
                                    Processing <Progress />
                                  </Typography>
                                ) : (
                                  "Login"
                                )}
              </Button>
            </HmForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
