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
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          select
          required={required}
          fullWidth={fullWidth}
          size={size}
          error={!!error?.message}
          helperText={error?.message}
          sx={{ ...sx }}
          onChange={(event) => {
            field.onChange(event);
            onChange?.(event.target.value);
          }}
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
