import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    partNumber: '',
    operation: '',
    reasonForTest: '',
    testLocation: 'Press Shop',
    productionArea: 'Press Shop'
  });

  const [submittedData, setSubmittedData] = useState(null);

  const operationOptions = ['Draw & calibration', 'Hole Piercing'];
  const reasonOptions = ['New set up', 'Patrol', '1 hour patrol', 'Shift change', 'Last half'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  const handleOk = () => {
    if (submittedData) {
      navigate('/cover', { state: submittedData });
    } else {
      alert('Please submit the form first.');
    }
  };

  const handleCancel = () => {
    setFormData({
      partNumber: '',
      operation: '',
      reasonForTest: '',
      testLocation: 'Press Shop',
      productionArea: 'Press Shop'
    });
    setSubmittedData(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Part Selection Database
      </Typography>

      {/* Form */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <fieldset style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <legend><strong>Preliminary Filter Parts Data</strong></legend>

            {/* Each field on a separate row */}
            {[
              ['Part Number', 'partNumber'],
              ['Operation', 'operation', operationOptions],
              ['Reason for Test', 'reasonForTest', reasonOptions],
              ['Test Location', 'testLocation'],
              ['Production Area', 'productionArea']
            ].map(([label, key, options]) => (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} key={key}>
                <Typography sx={{ width: '150px' }}>{label}</Typography>
                {options ? (
                  <TextField
                    select
                    fullWidth
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  >
                    {options.map((opt, i) => (
                      <MenuItem key={i} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    fullWidth
                    required={key === 'partNumber'}
                  />
                )}
              </Box>
            ))}

            <Box sx={{ mt: 3, textAlign: 'right' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Submit
              </Button>
            </Box>
          </fieldset>
        </form>
      </Paper>

      {/* Submitted Data as One-Row Table */}
      {submittedData && (
        <>
          <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h6" gutterBottom>Submitted Entries</Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Part Number</strong></TableCell>
                  <TableCell><strong>Operation</strong></TableCell>
                  <TableCell><strong>Reason for Test</strong></TableCell>
                  <TableCell><strong>Test Location</strong></TableCell>
                  <TableCell><strong>Production Area</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{submittedData.partNumber}</TableCell>
                  <TableCell>{submittedData.operation}</TableCell>
                  <TableCell>{submittedData.reasonForTest}</TableCell>
                  <TableCell>{submittedData.testLocation}</TableCell>
                  <TableCell>{submittedData.productionArea}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          {/* OK & Cancel Buttons (Outside Table) */}
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 2, minWidth: '80px' }}
              onClick={handleOk}
            >
              OK
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ minWidth: '80px' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
