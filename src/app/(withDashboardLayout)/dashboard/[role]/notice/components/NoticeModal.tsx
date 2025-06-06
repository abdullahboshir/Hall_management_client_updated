 
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmFileUploader from "@/components/Form/HmFileUploader";
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
import { Button, Grid2 } from "@mui/material";
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

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch:any;
};

const NoticeModal = ({ open, setOpen, refetch }: TProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery(
    {}
  );
  const { data: hallData, isLoading: hallIsLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: diningIsLoading } =
    useGetAllDiningsQuery({});

  const [createNotice] = useCreateNoticeMutation();

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
    values.noticeData.createdBy = userData?._id;

    const data = modifyPayload(values);

    try {
      const res = await createNotice(data).unwrap();

      if (res?.id) {
        toast.success("Notice created has been Successfully!!");
        refetch();
        setOpen(false);
      }
    } catch (error:any) {
      console.log("got errorrrrrrrrrrrrrrrrrr", error);
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

           
            <Grid2 size={3}>
              <HmSelectField
                items={ScheduleType}
                name="noticeData.scheduleType"
                label="Schedule Type"
                fullWidth
              />
            </Grid2>

       
            <Grid2 size={3}>
              <HmDatePicker
                name="noticeData.scheduleAt"
                label="Schedule Date"
              />
            </Grid2>

       
            <Grid2 size={3}>
              <HmDatePicker name="noticeData.expiryDate" label="Expiry Date" />
            </Grid2>

            {/* Attachments */}
            <Grid2 size={3}>
              <HmFileUploader
                name="noticeData.attachments"
                label="Attachments"
                sx={{ width: "100%" }}
                  // multiple
              />
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

            {/* Related Notices */}
            <Grid2 size={6}>
              <HmSelectField
                items={[]}
                name="noticeData.relatedNotices"
                label="Related Notices"
                fullWidth
              />
            </Grid2>

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

            {/* Submit Button */}
            <Grid2 size={12} display="flex" justifyContent="end">
              <Button
                type="submit"
                disabled={hallIsLoading || diningIsLoading || userIsLoading}
                sx={{
                  padding: "5px 20px",
                  marginTop: "10px",
                }}
              >
                {hallIsLoading || diningIsLoading || userIsLoading
                  ?   <Spinner/>
                  : "Create"}
              </Button>
            </Grid2>
          </Grid2>
        </HmForm>
      )}
    </HmModal>
  );
};

export default NoticeModal;
