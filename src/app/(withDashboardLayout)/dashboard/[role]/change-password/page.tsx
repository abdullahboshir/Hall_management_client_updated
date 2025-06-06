"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import { useChangePasswordMutation, } from "@/redux/api/userApi";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { removeUser } from "@/services/auth.services";



const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
      newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long") // Minimum length of 6 characters
    .max(20, "Password must be at most 20 characters long") // Maximum length of 20 characters
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
    .regex(/[0-9]/, "Password must contain at least one number") // At least one number
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ), 
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const handleToggleVisibility = () => setShowPassword((prev) => !prev);

  const handleOnSubmit = async (data:any) => {

    try {
      const res = await changePassword({ body: data }).unwrap();
      if (res?.id) {
        toast.success("Your Password Change has been Successfully!!");
            removeUser()
            router.push('/login')
               router.refresh();
      }
    } catch (error) {
      console.log("got errorrrrrrrrrrrrrrrrrr", error);
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
          🔒 Change Your Password
        </Typography>

        <HmForm
          onSubmit={handleOnSubmit}
          resolver={zodResolver(changePasswordSchema)}
          defaultValues={{ password: "", confirmPassword: "" }}
        >
          <HmInput
            name="oldPassword"
            label="Old Password"
            type={showPassword ? "text" : "password"}
            required
              // @ts-expect-error no need to worry about this errora
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            />

          <HmInput
            name="newPassword"
            label="New Password"
            type={showPassword ? "text" : "password"}
            required
            sx={{ my: 2 }}
              // @ts-expect-error no need to worry about this error
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />


                   <HmInput
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            required
              // @ts-expect-error no need to worry about this error
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
            Change Password
          </Button>
        </HmForm>
      </Box>
    </Container>
  );
};

export default ChangePasswordPage;
