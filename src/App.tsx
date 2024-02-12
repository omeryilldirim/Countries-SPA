import { Box, Container, Input, Stack, TextField, Typography } from '@mui/material'
import CountriesList from './components/CountriesList';

function App() {
  return (
    <Container maxWidth='xl'>
        <Stack direction={'column'} gap={4} py={6}>
            <Typography variant='h1' fontSize={'3rem'} textAlign={'center'} fontWeight={'500'}>COUNTRIES</Typography>
            <Input sx={{width:'40%', marginX:'auto'}} fullWidth color="success" placeholder='search:<text>  group:<field>'/>
            <CountriesList />
        </Stack>
    </Container>
  );
}

export default App;
