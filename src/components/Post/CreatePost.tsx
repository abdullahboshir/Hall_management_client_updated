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

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({ open, setOpen }: TProps) => {
  const [error, setError] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [createPost] = useCreatePostMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.images = images;
    
    const data = modifyPayload(values);

    try {
      const res = await createPost(data as any).unwrap();
      if (res[0]?.id) {
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
        <Box width={"35vw"} p={2}>
          <Grid2 container spacing={3}>
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
                <Box display="flex" flexDirection="row" width="100%" gap={1}>
                  {images.map((file, i) => (
                    <Box
                      key={i}
                      width="6vw"
                      height="6vw"
                      position="relative"
                      borderRadius={1}
                      overflow="hidden"
                      border="1px solid #ccc"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`preview-${i}`}
                        layout="fill"
                        objectFit="cover"
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
              >
                <Tooltip title="Upload up to 5 images" arrow>
                  <label htmlFor="upload-images">
                    <IconButton component="span" sx={{ color: "#1976d2" }}>
                      <AddPhotoAlternateIcon fontSize="large" />
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
              <Typography color="error.main">{error}</Typography>
            </Grid2>

            <Grid2 size={12} display="flex" justifyContent="flex-end">
              <Button type="submit" sx={{ px: 3, py: 1 }}>
                {"Create"}
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </HmForm>
    </HmModal>
  );
};

export default CreatePost;
