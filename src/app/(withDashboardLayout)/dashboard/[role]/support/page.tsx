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

const supportTopics = [
  'Account/Login Issue',
  'Meal Charge Dispute',
  'Forgotten Password',
  'Technical Problem',
  'Other',
];

export default function SupportPage() {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('topic', topic);
    formData.append('message', message);
    if (file) formData.append('file', file);

    // TODO: send formData to your API
    alert('Support request sent!');

    // Reset form
    setTopic('');
    setMessage('');
    setFile(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>
      <Typography variant="body1" gutterBottom>
        Facing an issue? Let us know and we’ll get back to you.
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <FormControl fullWidth required>
          <InputLabel>Support Topic</InputLabel>
          <Select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            label="Support Topic"
          >
            {supportTopics.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Describe Your Issue"
          multiline
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button variant="outlined" component="label">
          Attach File (optional)
          <input
            type="file"
            hidden
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>
        {file && <Typography variant="body2">{file.name}</Typography>}

        <Button type="submit" variant="contained" color="primary">
          Submit Request
        </Button>
      </Box>
    </Container>
  );
}
