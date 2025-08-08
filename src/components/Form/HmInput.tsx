 
import { SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
  type?: string;
  size?: "small" | "medium";
  required?: boolean;
  fullWidth?: boolean;
  rows?: number;
  isMultiline?: boolean;
  sx?: SxProps;
  defaultValue?: string;
};

const HmInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth = true,
  rows = 4,
  isMultiline = false,
  required,
  defaultValue,
  sx,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          type={type}
          size={size}
          fullWidth={fullWidth}
          rows={rows}
          multiline={isMultiline}
          required={required}
          defaultValue={defaultValue}
          sx={{ 
            ...sx,
            "& .MuiInputLabel-root": {
              fontSize: { xs: "12px", sm: "14px" }
            },
            "& .MuiInputBase-input": {
              fontSize: { xs: "12px", sm: "14px" }
            },
            "& .MuiFormHelperText-root": {
              fontSize: { xs: "10px", sm: "12px" }
            }
          }}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default HmInput;
