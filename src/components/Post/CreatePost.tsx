"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Grid2,
} from "@mui/material";
import Image from "next/image";
import { toast } from "sonner";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmModal from "@/components/Shared/HmModal/HmModal";
import { modifyPayload } from "@/utils/modifyPayload";
// import Progress from '@/components/Shared/Spinner/Progress';
// import { useCreateManagerMutation } from '@/redux/api/managerApi';
// import { useGetSingleUserQuery } from '@/redux/api/userApi';
import { FieldValues } from "react-hook-form";
import { useCreatePostMutation } from "@/redux/api/postApi";
import Progress from "../Shared/Spinner/Progress";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({ open, setOpen }: TProps) => {
  const [error, setError] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [createPost, {isLoading}] = useCreatePostMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.images = images;
    
    const data = modifyPayload(values);

    try {
      const res = await createPost(data as any).unwrap();
      if (res?._id) {
        toast.success("Post created successfully!");
        setOpen(false);
        setError("");
        setImages([]);
      }
    } catch (err: any) {
      const isDuplicate = err?.data?.includes("E11000");
      if (
        (isDuplicate && err?.data?.includes("index: email_1")) ||
        err?.data?.includes("index: phoneNumber_1")
      ) {
        setError("Email or Phone Number already registered!");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selected = Array.from(files).slice(0, 5); // limit 5
      setImages(selected);
    }
  };

  const managerDefaultValues = {
    postData: {
      title: "",
      description: "",
    },
  };

  return (
    <HmModal
      open={open}
      setOpen={setOpen}
      setError={setError}
      title="Create Post"
    >
      <HmForm onSubmit={handleFormSubmit} defaultValues={managerDefaultValues}>
        <Box 
          width={{ xs: "90vw", sm: "70vw", md: "50vw", lg: "35vw" }} 
          p={{ xs: 1, sm: 2 }}
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={12}>
              <HmInput name="postData.title" label="Title of Post" />
            </Grid2>

            <Grid2 size={12}>
              <HmInput
                name="postData.description"
                label="Write your Description"
                isMultiline={true}
                rows={4}
              />
            </Grid2>

            {images.length > 0 && (
              <Grid2 size={12}>
                <Box 
                  display="flex" 
                  flexDirection="row" 
                  width="100%" 
                  gap={1}
                  flexWrap="wrap"
                >
                  {images.map((file, i) => (
                    <Box
                      key={i}
                      width={{ xs: "80px", sm: "100px", md: "6vw" }}
                      height={{ xs: "80px", sm: "100px", md: "6vw" }}
                      position="relative"
                      borderRadius={1}
                      overflow="hidden"
                      border="1px solid #ccc"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`preview-${i}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid2>
            )}

            <Grid2 size={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                border={1}
                borderColor="secondary.light"
                borderRadius={2}
                py={{ xs: 1, sm: 2 }}
              >
                <Tooltip title="Upload up to 5 images" arrow>
                  <label htmlFor="upload-images">
                    <IconButton 
                      component="span" 
                      sx={{ 
                        color: "#1976d2",
                        "& svg": {
                          fontSize: { xs: "24px", sm: "32px" }
                        }
                      }}
                    >
                      <AddPhotoAlternateIcon />
                    </IconButton>
                    <input
                      id="upload-images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      hidden
                    />
                  </label>
                </Tooltip>
              </Box>
            </Grid2>

            <Grid2 size={12}>
              <Typography 
                color="error.main"
                fontSize={{ xs: "12px", sm: "14px" }}
              >
                {error}
              </Typography>
            </Grid2>

           <Grid2 size={12} display="flex" justifyContent="end" width="100%">
                    <Button
                      type="submit"
                      sx={{
                        padding: { xs: "5px 15px", sm: "7px 20px" },
                        marginTop: "10px",
                        fontSize: { xs: "12px", sm: "14px" }
                      }}
                    >
                      {isLoading ? (
                        <Typography 
                          display="flex" 
                          gap={1} 
                          color="white"
                          fontSize={{ xs: "12px", sm: "14px" }}
                        >
                          Processing <Progress />
                        </Typography>
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </Grid2>
          </Grid2>
        </Box>
      </HmForm>
    </HmModal>
  );
};

export default CreatePost;
