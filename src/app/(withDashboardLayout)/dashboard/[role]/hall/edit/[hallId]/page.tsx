/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import Progress from "@/components/Shared/Spinner/Progress";
import {
  useGetAllHallsQuery,
  useUpdateHallMutation,
} from "@/redux/api/hallApi";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const HallUpdatePage = () => {
  const params = useParams();
  const hallId = params?.hallId as string;

  const { data, isLoading } = useGetAllHallsQuery({});
  const [updateHall] = useUpdateHallMutation();

  const router = useRouter();

  const handleFormSubmit = async (values: FieldValues) => {
    values.id = hallId;

    const hallData = { id: values.id, body: values };


    try {
      const res = await updateHall(hallData);
      if (res?.data?._id) {
        toast.success("Manager Updated Successfully!!");
        router.back();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const hallDefaultValues = {
    phoneNumber: data?.phoneNumber || "",
    email: data?.email || "",
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Update Hall
      </Typography>

      {isLoading ? (
        "Loading..."
      ) : (
        <HmForm
          onSubmit={handleFormSubmit}
          defaultValues={data && hallDefaultValues}
        >
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <HmInput name="phoneNumber" label="Contact Number" />
            </Grid2>
            <Grid2 size={4}>
              <HmInput name="email" label="Email" />
            </Grid2>

            {/* Add other fields like bloodGroup, addresses, etc. */}
            <Grid2 size={12}>
              <Button
                type="submit"
                sx={{ padding: "10px 50px", marginTop: "10px" }}
              >
                {isLoading ? (
                  <Typography display="flex" gap={1} color="white">
                    Processing <Progress />
                  </Typography>
                ) : (
                  "Update"
                )}
              </Button>
            </Grid2>
          </Grid2>
        </HmForm>
      )}
    </Box>
  );
};

export default HallUpdatePage;
