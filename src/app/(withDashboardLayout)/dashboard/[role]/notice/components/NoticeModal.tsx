 
import HmDatePicker from "@/components/Form/HmDatePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmSelectField from "@/components/Form/HmSelectField";
import HmModal from "@/components/Shared/HmModal/HmModal";
import {
  NoticeAudience,
  NoticePriority,
  NoticeStatus,
  NoticeType,
  ScheduleType,
} from "@/constant/common.constant";

import { useGetAllDiningsQuery } from "@/redux/api/diningApi";
import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Grid2, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { noticeDefaultValues } from "../../../constants/notice.constant";
import { noticeValidationSchema } from "../../../validation/notice.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNoticeMutation } from "@/redux/api/noticeApi";
import HmInputTypeChip from "@/components/Form/HmInputTypeChip";
import HmInputSelectChip from "@/components/Form/HmInputSelectChip";
import Spinner from "@/components/Shared/Spinner/Spinner";
import Image from "next/image";
import Progress from "@/components/Shared/Spinner/Progress";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch:any;
};

const NoticeModal = ({ open, setOpen, refetch }: TProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery(
    {}
  );
  const { data: hallData, isLoading: hallIsLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: diningIsLoading } =
    useGetAllDiningsQuery({});

  const [createNotice, {isLoading: createNoticeLoading}] = useCreateNoticeMutation();
console.log('userData', userData)
  const handleFormSubmit = async (values: FieldValues) => {
    if (hallIsLoading || diningIsLoading || userIsLoading) {
        <Spinner/>
    }

    if (!hallData || !diningData || !userData?.id) {
      toast.error("Failed to fetch required data. Please try again.");
      return;
    }

    values.noticeData.hall = hallData?._id;
    values.noticeData.dining = diningData?._id;
    values.noticeData.createdBy = userData?.user?._id;
     values.images = images;

     console.log('helloooooooooooooooooooooo', values)

    const data = modifyPayload(values);

    try {
      const res = await createNotice(data).unwrap();

      if (res?.id) {
        toast.success("Notice created has been Successfully!!");
        refetch();
        setOpen(false);
        setError("");
      }
    } catch (error:any) {
      console.log("got errorrrrrrrrrrrrrrrrrr", error);
      setError(error?.data || "Failed to create notice");
    }
  };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const selected = Array.from(files).slice(0, 6); // limit 6
        setImages(selected);
      }
    };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      event.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <HmModal
      open={open}
      setOpen={setOpen}
      title="Create Notice"
      sx={{
        "& .MuiDialog-paper": {
          width: "55%",
          maxWidth: "1200px",
        },
      }}
    >
      {hallIsLoading || diningIsLoading || userIsLoading ? (
        <p>Loading data, please wait...</p>
      ) : (
        <HmForm
          onSubmit={handleFormSubmit}
          defaultValues={noticeDefaultValues ? noticeDefaultValues : {}}
          resolver={zodResolver(noticeValidationSchema)}
        >
          <Grid2 container spacing={2}>

            <Typography variant="h6" color="error" textAlign="center" width="100%">
              {error}
            </Typography>
      
            <Grid2 size={3}>
              <HmSelectField
                items={NoticeAudience}
                name="noticeData.audience"
                label="Audience"
                fullWidth
              />
            </Grid2>

     
            <Grid2 size={3}>
              <HmSelectField
                items={NoticeStatus}
                name="noticeData.status"
                label="Status"
                fullWidth
              />
            </Grid2>

         
            <Grid2 size={3}>
              <HmSelectField
                items={NoticePriority}
                name="noticeData.priority"
                label="Priority"
                fullWidth
              />
            </Grid2>

        
            <Grid2 size={3}>
              <HmSelectField
                items={NoticeType}
                name="noticeData.noticeType"
                label="Notice Type"
                fullWidth
              />
            </Grid2>


       
            <Grid2 size={4}>
              <HmDatePicker
                name="noticeData.scheduleAt"
                label="Schedule Date"
              />
            </Grid2>

       
            <Grid2 size={4}>
              <HmDatePicker name="noticeData.expiryDate" label="Expiry Date" />
            </Grid2>

           
            <Grid2 size={4}>
                <Tooltip title="Upload up to 5 images" arrow>
              <label htmlFor="upload-images">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="primary.main"
                borderColor="secondary.light"
                borderRadius={1}
                sx={{cursor: 'pointer'}}
              >
                 <Box display="flex" alignItems="center" >
                     <Typography color="white">File Attachment</Typography>
                    <IconButton component="span" sx={{ color: "white" }}>
                      <CloudUploadIcon fontSize="medium" />
                    </IconButton>
                 </Box>
                    <input
                      id="upload-images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      hidden
                    />
              </Box>
                  </label>
                </Tooltip>
            </Grid2>

            {/* Tags */}
            <Grid2 size={6}>
              <HmInputTypeChip
                name="noticeData.tags"
                label="Enter Tags"
                tagInput={tagInput}
                tags={tags}
                setTagInput={setTagInput}
                setTags={setTags}
                handleKeyDown={handleKeyDown}
              />
            </Grid2>

            <Grid2 size={6}>
              <HmInputSelectChip
                items={ScheduleType}
                name="noticeData.scheduleType"
                label="Scedule Type"
                fullWidth
              />
            </Grid2>

         
            {/* <Grid2 size={6}>
              <HmSelectField
                items={[]}
                name="noticeData.relatedNotices"
                label="Related Notices"
                fullWidth
              />
            </Grid2> */}

            {/* Title */}
            <Grid2 size={12}>
              <HmInput name="noticeData.title" label="Title of Notice" />
            </Grid2>

            {/* Description */}
            <Grid2 size={12}>
              <HmInput
                name="noticeData.description"
                label="Description"
                isMultiline={true}
                rows={4}
              />
            </Grid2>


              {images.length > 0 && (
  <Grid2 size={12}>
    <Box display="flex" flexDirection="row" width="100%" gap={1}>
      {images.map((file, i) => {
        const widthPercent = `${100 / Math.min(images.length, 6)}%`; // Max 6 in a row
        return (
          <Box
            key={i}
            width={widthPercent}
            position="relative"
            height={100}
            borderRadius={1}
            overflow="hidden"
            border="1px solid #ccc"
            sx={{ aspectRatio: "1" }} // Maintains square ratio using sx
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`preview-${i}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        );
      })}
    </Box>
  </Grid2>
)}
            <Grid2 size={12} display="flex" justifyContent="end">
                   <Button
                      type="submit"
                      disabled={hallIsLoading || diningIsLoading || userIsLoading}
                      sx={{
                        padding: "7px 20px",
                        marginTop: "10px",
                      }}
                    >
                      {hallIsLoading ||
                      diningIsLoading ||
                      userIsLoading ||
                       createNoticeLoading? (
                        <Typography display="flex" gap={1} color="white">
                          Processing <Progress />
                        </Typography>
                      ) : (
                        "Create"
                      )}
                    </Button>
            </Grid2>
          </Grid2>
        </HmForm>
      )}
    </HmModal>
  );
};

export default NoticeModal;
