"use client";

import React from "react";
import {
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  items: string[];
  size?: "small" | "medium";
  fullWidth?: boolean;
};

const HmInputSelectChip = ({
  name,
  label,
  items,
  size = "small",
  fullWidth = true,
}: TProps) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth={fullWidth} size={size}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const handleDelete = (valueToDelete: string) => {
            const updated = field.value.filter(
              (val: string) => val !== valueToDelete
            );
            field.onChange(updated);
          };

          return (
            <Select
              multiple
              value={Array.isArray(field.value) ? field.value : []}
              onChange={(event: SelectChangeEvent<string[]>) =>
                field.onChange(event.target.value as string[])
              }
              input={<OutlinedInput label={label} />}
              renderValue={(selected) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {(selected as string[]).map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      onDelete={(e) => {
                        e.stopPropagation();
                        handleDelete(value);
                      }}
                      size="small"
                      sx={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  ))}
                </div>
              )}
            >
              {items.map((item) => (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={field.value?.includes(item)} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </FormControl>
  );
};

export default HmInputSelectChip;
