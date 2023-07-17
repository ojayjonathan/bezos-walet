import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function Header() {
  return (
    <Stack spacing={2}>
      <Typography variant='h2' color='primary.main'>Bezos Wallet</Typography>

      <Typography variant='h4' sx={{ fontWeight: 300 }}>Transaction History</Typography>

      <Stack direction='row' spacing={2} alignItems='center' pl={1}>
        <Typography variant='body1' sx={{ fontWeight: 500 }}>Month</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year', 'month']}
            label='Year and Month'
            minDate={new Date('2020-01-31')}
            maxDate={new Date('2029-06-01')}
            value={new Date('2029-01-31')}
            onChange={() => console.log('Not implemented :)')}
            renderInput={(params: any) => <TextField {...params} helperText={null} />}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
}
