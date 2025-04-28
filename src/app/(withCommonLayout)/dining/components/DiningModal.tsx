/* eslint-disable @typescript-eslint/no-explicit-any */
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmModal from "@/components/Shared/HmModal/HmModal";
import {
  useAddDepositMutation,
  useGetSingleMealQuery,
  useUpdateDueMaintenanceFeeMutation,
} from "@/redux/api/mealApi";
import { currentDateBD } from "@/utils/currentDateBD";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
// import { toast } from "sonner";

type TProps = {
  mealId: string | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const { currentYear, currentMonth } = currentDateBD();

const DiningModal = ({ mealId, open, setOpen }: TProps) => {
  const [addDeposit] = useAddDepositMutation();
  const [updateDueMaintenanceFee] = useUpdateDueMaintenanceFeeMutation();
  const { data, isLoading, refetch } = useGetSingleMealQuery<any>(mealId);

  const handleFormSubmit = async (values: FieldValues) => {
    refetch();
    const inputDepost = { id: mealId, body: values };

    try {
      const res = await addDeposit(inputDepost).unwrap();

      if (res?.id) {
        toast.success("Deposit has been added successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const handleDueMaintenanceFee = async (year: string, month: string) => {
    const dueMaintenanceFeeInfo = { id: mealId, body: { year, month } };

    try {
      const res = await updateDueMaintenanceFee(dueMaintenanceFeeInfo).unwrap();

      if (res?.mealInfo[currentYear][currentMonth]?.currentDeposit < 50) {
        toast.success("Your current Deposit is low!, Deposit before.");
      } else if (res?.id) {
        refetch();
        toast.success("Maintenance Fee has been added successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const depositDefaultValues = {
    currentDeposit: 50,
  };

  const monthsWithZeroMaintenance: Record<string, string[]> = {}; // Object to store years and months

  for (const year in data?.mealInfo) {
    if (typeof data?.mealInfo[year] !== "object") continue; // Skip invalid years

    for (const month in data?.mealInfo[year]) {
      const monthData = data?.mealInfo[year][month];

      if (
        monthData &&
        typeof monthData.maintenanceFee === "number" &&
        monthData.maintenanceFee === 0
      ) {
        // ✅ Store the year inside the month key
        if (!monthsWithZeroMaintenance[year]) {
          monthsWithZeroMaintenance[year] = [];
        }
        monthsWithZeroMaintenance[year].push(month); // Store the year for this month
      }
    }
  }

  return (
    <HmModal open={open} setOpen={setOpen} title="Current Deposit">
      <Box>
        <Stack>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            component="fieldset"
            border="1px solid"
            borderColor="grey.300"
            borderRadius={2}
            p={2}
            maxWidth="xs"
            bgcolor="grey.100"
          >
            <Typography component="legend" sx={{ px: 1, fontSize: "0.9rem" }}>
              Add Deposit
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <HmForm
                onSubmit={handleFormSubmit}
                defaultValues={depositDefaultValues}
              >
                <Grid2 container spacing={2}>
                  <Grid2>
                    <HmInput
                      name="currentDeposit"
                      label="Deposit"
                      type="number"
                      fullWidth={true}
                    />
                  </Grid2>

                  <Grid2>
                    <Button
                      type="submit"
                      // disabled={hallIsLoading || diningIsLoading || userIsLoading}
                    >
                      Add
                    </Button>
                  </Grid2>
                </Grid2>
              </HmForm>
            </Box>
          </Box>
        </Stack>

        {Object.entries(monthsWithZeroMaintenance).length > 0 && (
          <Stack mt={5}>
            <Box
              component="fieldset"
              sx={{
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                maxWidth: "xs",
                bgcolor: "grey.100",
              }}
            >
              <Typography component="legend" sx={{ px: 1, fontSize: "0.9rem" }}>
                Record of Due Maintenance Fee
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {Object.entries(monthsWithZeroMaintenance).map(
                  ([year, months], index) => (
                    <Box key={index} sx={{ width: "100%" }}>
                      {/* Year Header with Background */}
                      <Box
                        textAlign="center"
                        borderRadius={1}
                        fontWeight="bold"
                        padding={0.5}
                        bgcolor="#ef5350"
                        color="white"
                      >
                        {isLoading ? "Loading..." : year}
                      </Box>

                      {/* Months List */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: "wrap", mt: 1 }}
                      >
                        {months.map((month, monthIndex) => (
                          <Typography
                            key={monthIndex}
                            variant="body2"
                            color="white"
                            textAlign="center"
                            borderRadius={1}
                            fontWeight="bold"
                            p={0.3}
                            // sx={{ bgColor: "#9E9E9E" }}
                            sx={{ bgcolor: "primary.light" }}
                          >
                            {month}{" "}
                            <Button
                              size="small"
                              onClick={() =>
                                handleDueMaintenanceFee(year, month)
                              }
                              sx={{
                                // color: "black",
                                p: 0,
                                minWidth: 1,
                                mt: 0.5,
                                bgcolor: "prmary.main",
                              }}
                            >
                              Paid
                            </Button>
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
    </HmModal>
  );
};

export default DiningModal;
