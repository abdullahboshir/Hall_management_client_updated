import React, { useState } from "react";
import { Box, Chip, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type HmInputChipProps = {
  name: string;
  label: string;
  size?: "small" | "medium";
  tagInput: string;
  tags: string[];
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  sx?: SxProps;
};

const HmInputTypeChip = ({
  name,
  label,
  size = "small",
  tagInput,
  tags,
  setTagInput,
  setTags,
  sx,
}: HmInputChipProps) => {
  const [isOnfocus, setIsOnfocus] = useState(false);
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => {
        const handleDelete = (tagToDelete: string) => {
          const updatedTags = tags.filter((tag) => tag !== tagToDelete);
          setTags(updatedTags);
          field.onChange(updatedTags);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            const updatedTags = [...tags, tagInput.trim()];
            setTags(updatedTags);
            setTagInput("");
            field.onChange(updatedTags);
          }
        };

        return (
          <TextField
            {...field}
            label={label}
            fullWidth
            size={size}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOnfocus(true)}
            onBlur={() => setIsOnfocus(false)}
            placeholder="Type a tag and press Enter"
            variant="outlined"
            sx={{ ...sx }}
            error={!!error?.message}
            helperText={error?.message}
            slotProps={{
              input: {
                startAdornment:
                  !isOnfocus && !tags.length ? (
                    ""
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        flexDirection: "row",
                      }}
                    >
                      {tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => handleDelete(tag)}
                          size="small"
                        />
                      ))}
                    </Box>
                  ),
              },
            }}
          />
        );
      }}
    />
  );
};

export default HmInputTypeChip;
