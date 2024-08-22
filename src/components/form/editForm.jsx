// components/EditForm.js
import { TextField, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';

const EditForm = ({ rowData, onSave, onCancel, labels }) => {
  const [formData, setFormData] = useState(rowData);

  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Box sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <h3>Chỉnh sửa</h3>
      {Object.keys(formData).map((key) => (
        key !== 'id' && (
          <TextField
            key={key}
            name={key}
            label={labels[key] || key}  // Use custom labels if provided
            value={formData[key] || ''}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )
      ))}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>Lưu</Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ marginLeft: 2 }}>Hủy</Button>
      </Box>
    </Box>
  );
};

export default EditForm;
