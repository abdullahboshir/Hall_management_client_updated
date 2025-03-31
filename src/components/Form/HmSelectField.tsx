import * as React from "react";
import { SxProps } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

type TTextField = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  required?: boolean;
  fullWidth?: boolean;
  items: string[];
  sx?: SxProps;
  onChange?: (value: string) => void;
};

export default function HmSelectField({
  items,
  name,
  label,
  size = "small",
  required,
  fullWidth = true,
  sx,
  onChange,
}: TTextField) {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          select
          required={required}
          fullWidth={fullWidth}
          size={size}
          error={isError}
          sx={{ ...sx }}
          onChange={(event) => {
            field.onChange(event);
            onChange?.(event.target.value);
          }}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
