"use client";
import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  exampleRequired: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
            <Typography variant="h5" fontWeight={600} marginBottom={3}>
              Login
            </Typography>
          </Stack>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid2
                container
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid2 size={6}>
                  <TextField
                    size="small"
                    label="Email"
                    variant="outlined"
                    type="email"
                    {...register("email")}
                  />
                </Grid2>

                <Grid2 size={6}>
                  <TextField
                    size="small"
                    label="Password"
                    variant="outlined"
                    type="password"
                    {...register("password")}
                  />
                </Grid2>
              </Grid2>
              <Typography textAlign="end">Forgot Password?</Typography>
              <Button
                type="submit"
                sx={{ margin: "10px 0px" }}
                fullWidth={true}
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
