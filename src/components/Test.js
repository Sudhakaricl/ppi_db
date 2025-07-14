import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import StorageIcon from '@mui/icons-material/Storage';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const propertyData = {
  Thickness: { LSL: '2.34', Normal: '2.5', USL: '2.66', Remarks: 'Check thickness with micrometer' },
  'Outer Diameter': { LSL: '29.0', Normal: '30.0', USL: '31.0', Remarks: 'Measure with Vernier' },
  'Corden Height': { LSL: '14.5', Normal: '15.0', USL: '15.5', Remarks: 'Check top height' },
  'Cover Height': { LSL: '9.8', Normal: '10.0', USL: '10.2', Remarks: 'Control with gauge' },
  'Garden Paralism': { LSL: '5.0', Normal: '5.5', USL: '6.0', Remarks: 'Parallel measurement' },
  'Junction Height': { LSL: '6.0', Normal: '6.5', USL: '7.0', Remarks: 'Height at junction' },
  'Finger Height': { LSL: '2.3', Normal: '2.5', USL: '2.7', Remarks: 'Fine finger height' },
  'Drive Stop Area': { LSL: '4.9', Normal: '5.0', USL: '5.1', Remarks: 'Drive stop tolerance' },
  'Finger Width': { LSL: '1.8', Normal: '2.0', USL: '2.2', Remarks: 'Finger width check' },
  'Logo': { LSL: '-', Normal: '-', USL: '-', Remarks: 'Visual inspection only' },
  'Flatness': { LSL: '-', Normal: '-', USL: '-', Remarks: 'Visual flatness' },
  'Dry Strap Flatness': { LSL: '-', Normal: '-', USL: '-', Remarks: 'Strap flatness test' }
};

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const data = location.state || {};
  const inputRef = useRef(null);

  const propertyKeys = Object.keys(propertyData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedProperty = propertyKeys[currentIndex];
  const [actualInput, setActualInput] = useState('');
  const [history, setHistory] = useState({});

  const handleActualValueSubmit = () => {
    if (!actualInput || isNaN(actualInput)) return;

    const now = new Date();
    const time = now.toLocaleTimeString();
    const newEntry = {
      id: (history[selectedProperty]?.length || 0) + 1,
      value: parseFloat(actualInput),
      time
    };

    setHistory(prev => {
      const updated = [...(prev[selectedProperty] || []), newEntry];
      return { ...prev, [selectedProperty]: updated };
    });

    setActualInput('');

    if (currentIndex < propertyKeys.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTimeout(() => navigate('/home'), 200); // Redirect when last property done
    }
  };

  const handlePropertyClick = (index) => {
    setCurrentIndex(index);
    setActualInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handlePrevValue = () => {
    const entries = history[selectedProperty] || [];
    if (entries.length > 0) {
      setActualInput(entries[entries.length - 1].value.toString());
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const entries = history[selectedProperty] || [];
  const lastFiveEntries = entries.slice(-5);
  const selectedMeta = propertyData[selectedProperty];

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StorageIcon fontSize="large" sx={{ mr: 2 }} />
        <InsertDriveFileIcon fontSize="large" />
      </Box>
      <Grid container spacing={2} columns={12}>
        {/* Column 1: Properties List */}
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Properties</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {propertyKeys.map((prop, idx) => (
                <Button
                  key={prop}
                  onClick={() => handlePropertyClick(idx)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: idx === currentIndex ? '#e3f2fd' : 'transparent',
                    borderColor: idx === currentIndex ? 'primary.main' : 'grey.300',
                    fontWeight: idx === currentIndex ? 'bold' : 'normal'
                  }}
                >
                  {prop}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Column 2: Entry Input and History */}
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Enter Actual Value</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>{selectedProperty}</strong>: LSL: {selectedMeta.LSL}, Normal: {selectedMeta.Normal}, USL: {selectedMeta.USL}
            </Typography>
            <TextField
              label="Actual Value"
              fullWidth
              size="small"
              inputRef={inputRef}
              value={actualInput}
              onChange={(e) => setActualInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleActualValueSubmit()}
              sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" onClick={handleActualValueSubmit} sx={{ mb: 1 }}>
              Submit & Next
            </Button>
            <Button fullWidth variant="outlined" onClick={handlePrevValue}>
              Prev Value
            </Button>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Last 5 Entries</Typography>
              {lastFiveEntries.map((entry) => (
                <Typography key={entry.id}>
                  #{entry.id} — {entry.value} ({entry.time})
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Column 3: Graph */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Paper sx={{ p: 2, height: '50%' }}>
            <Typography variant="h6" gutterBottom>Actual Value Trend</Typography>
            {entries.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={entries}>
                  <XAxis dataKey="id" label={{ value: 'Entry #', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={['auto', 'auto']} label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1976d2" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">No data yet</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Test;