import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Box } from "@mui/material";

type TProps = {
  name: string;
  label: string;
  sx?: SxProps;
};

export default function HmFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();
  const [preview, setPreview] = React.useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        React.useEffect(() => {
          if (value && typeof value !== "string") {
            const url = URL.createObjectURL(value);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
          } else {
            setPreview(null);
          }
        }, [value]);

        return (
          <Box>
            <label style={{ cursor: "pointer" }}>
              {preview ? (
                <img
                  src={preview}
                  alt="Uploaded preview"
                  style={{
                    width: '100%', // same as button
                    height: 40, // same as button
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              ) : (
                <Button
                  component="span"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{...sx }}
                >
                  {label || "Upload"}
                </Button>
              )}

              <Input
                {...field}
                type="file"
                onChange={(e) => {
                  const file = (e?.target as HTMLInputElement)?.files?.[0]; 
                  if (file) {
                    onChange(file);
                  }
                }}
                style={{ display: "none" }}
              />
            </label>
          </Box>
        );
      }}
    />
  );
}





// import * as React from "react"; 
// import { SxProps } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { Controller, useFormContext } from "react-hook-form";
// import { Input } from "@mui/material";

// type TProps = {
//   name: string;
//   label: string;
//   sx?: SxProps;
// };

// export default function HmFileUploader({ name, label, sx }: TProps) {
//   const { control } = useFormContext();
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value, ...field } }) => {
//         return (
//           <Button
//             component="label"
//             role={undefined}
//             variant="contained"
//             tabIndex={-1}
//             startIcon={<CloudUploadIcon />}
//             sx={{ ...sx }}
//           >
//             {label ? label : "Upload files"}
//             <Input
//               {...field}
//               type={name}
//               value={value?.filename}
//               onChange={(e) =>
//                 onChange((e?.target as HTMLInputElement)?.files?.[0])
//               }
//               style={{ display: "none" }}
//             />
//           </Button>
//         );
//       }}
//     />
//   );
// }