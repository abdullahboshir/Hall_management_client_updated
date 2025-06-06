'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const categories = [
  'Food Quality',
  'Hygiene',
  'Service',
  'Late Meal',
  'Other',
];

export default function DiningReportPage() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Submit data to backend API
    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    if (file) formData.append('file', file);

    alert('Complaint submitted!');

    // Reset form
    setCategory('');
    setDescription('');
    setFile(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Submit Dining Complaint
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Complaint Description"
          multiline
          rows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button variant="outlined" component="label">
          Upload Photo (optional)
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>
        {file && <Typography variant="body2">{file.name}</Typography>}

        <Button type="submit" variant="contained" color="primary">
          Submit Complaint
        </Button>
      </Box>
    </Container>
  );
}
