import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../helper/apollo';
import { CircularProgress, Stack, Typography } from '@mui/material';
import CountryCard from './CountryCard';
import { useState } from 'react';

const CountriesList = () => {
  const { loading, error, data:{countries} = [] } = useQuery(GET_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState(null)

  if (loading) return (
    <Stack direction={'row'} flexWrap={'wrap'} gap={2} justifyContent={'center'}>
        <CircularProgress />
        <Typography fontSize={'1.5rem'}>Loading...</Typography>
    </Stack>
  );
  if (error) return (
    <Typography textAlign={'center'} fontSize={'1.5rem'}>Error ! {error.message}</Typography>
  )

  return (
    <Stack direction={'row'} flexWrap={'wrap'} gap={2} justifyContent={'center'}>
        {countries?.map((country, i)=>(
            <CountryCard key={i} country={country} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        ))}
    </Stack>
  )
}

export default CountriesList