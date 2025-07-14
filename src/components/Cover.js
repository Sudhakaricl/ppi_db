import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  MenuItem
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Cover = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const homeData = location.state || {}; // partNumber, operation, reasonForTest

  const [coverData, setCoverData] = useState({
    operatorName: 'Prakash',
    machineNumber: '',
    reasonForTest: '',
    orderNo: '',
    text: '',
    toolNo: ''
  });

  const handleChange = (e) => {
    setCoverData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOk = () => {
    navigate('/test', {
      state: {
        ...homeData,
        ...coverData
      }
    });
  };

  const handleCancel = () => {
    setCoverData({
      operatorName: 'Prakash',
      machineNumber: '',
      reasonForTest: '',
      orderNo: '',
      text: '',
      toolNo: ''
    });
  };

  const machineOptions = ['P1 1000 ton', 'P2 400 ton', 'P3 200 ton', 'P4 2000 ton'];
  const reasonOptions = ['New set up', 'Patrol', '1 hour patrol', 'Shift change', 'Last half'];

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>Cover Page Form</Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <form>
          {[
            ['Operator Name', 'operatorName'],
            ['Machine Number', 'machineNumber', machineOptions],
            ['Reason for Test', 'reasonForTest', reasonOptions],
            ['Order No', 'orderNo'],
            ['Text', 'text'],
            ['Tool No', 'toolNo']
          ].map(([label, key, options]) => (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} key={key}>
              <Box sx={{ width: '200px' }}>
                <Typography>{label}</Typography>
              </Box>
              {options ? (
                <TextField
                  select
                  fullWidth
                  name={key}
                  value={coverData[key]}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {options.map((opt, i) => (
                    <MenuItem key={i} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  name={key}
                  value={coverData[key]}
                  onChange={handleChange}
                  variant="outlined"
                />
              )}
            </Box>
          ))}
        </form>
      </Paper>

      <Box textAlign="right" mt={2}>
        <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handleOk}>OK</Button>
        <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
      </Box>
    </Container>
  );
};

export default Cover;
