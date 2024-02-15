import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../helper/apollo';
import { CircularProgress, Stack, Typography } from '@mui/material';
import CountryCard from './CountryCard';
import { useState, useEffect } from 'react';
import colorPalette from '../helper/colorPalette';

interface SearchTerms {
  text: string;
  field: string;
}

interface Country {
  code: string;
  name: string;
  emoji: string;
  emojiU: string;
  continent: {
    name: string;
  };
  currency: string;
  languages: {
    name: string;
  }[];
  [key: string]: any;
}

const CountriesList = ({searchTerms}: { searchTerms: SearchTerms }) => {
  const { loading, error, data:{countries} = [] } = useQuery(GET_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [colorIndex, setColorIndex] = useState(0)
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const filterCountries = () => {
    if (!countries) return
    if (!searchTerms.text) {
      setFilteredCountries(countries)
      return
    }
    const filteredCountries = countries.filter((country:Country)=>{
      return country.name.toLowerCase().includes(searchTerms.text)
    })
    const groupingField = filteredCountries[0][searchTerms.field]

    if(!groupingField) return setFilteredCountries(filteredCountries)

    filteredCountries.sort((a:Country, b:Country)=> {
      if (Array.isArray(groupingField)) {
        return a[searchTerms.field].length >= b[searchTerms.field].length ? -1 : 1
      } else {
        if ( typeof groupingField === 'object') {
          return a[searchTerms.field].name.localeCompare(b[searchTerms.field].name)
        } else {
          return a[searchTerms.field].toLowerCase() - b[searchTerms.field].toLowerCase()
        }
      }
    })
    setFilteredCountries(filteredCountries)
  }

  const select10thItem = () => {
    if (filteredCountries.length >= 10) {
      setSelectedCountry(filteredCountries[9].code)
    } else{
      setSelectedCountry(filteredCountries[filteredCountries.length - 1].code)
    }
  }
  
  useEffect(() => {
    if (filteredCountries.length > 0) select10thItem()
  }, [filteredCountries])
  

  useEffect(() => {
    filterCountries()
  }, [searchTerms, countries])

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
        {filteredCountries?.map((country, i)=>(
            <CountryCard 
              key={i} 
              index={i+1}
              country={country}
              selectedCountry={selectedCountry} 
              setSelectedCountry={setSelectedCountry} 
              color={colorPalette[colorIndex]}
              setColorIndex={setColorIndex}
            />
        ))}
    </Stack>
  )
}

export default CountriesList