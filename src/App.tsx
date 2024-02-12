import { Container, Stack, TextField, Typography } from '@mui/material'
import CountriesList from './components/CountriesList';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('')
  return (
    <Container maxWidth='xl'>
        <Stack direction={'column'} gap={4} py={6}>
            <Typography variant='h1' fontSize={'3rem'} textAlign={'center'} fontWeight={'500'}>COUNTRIES</Typography>
            <TextField 
              value={query} 
              type='text' 
              size='small' 
              variant="outlined" 
              sx={{width:'40%', marginX:'auto'}}
              placeholder='search:<text>  group:<field>' 
              helperText='Please search for keyword and grouping field as requested.(search:<text>  group:<field>)'
              onChange={(e) => setQuery(e.target.value)}
            />
            <CountriesList />
        </Stack>
    </Container>
  );
}

export default App;
