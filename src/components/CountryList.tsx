import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../helper/apollo';
import { CircularProgress, Stack, Typography } from '@mui/material';
import CountryCard from './CountryCard';
import { useState, useEffect } from 'react';
import colorPalette from '../helper/colorPalette';
import { SearchTerms, Country } from '../helper/types';
import { toast } from 'react-toastify';

const CountriesList = ({searchTerms}: { searchTerms: SearchTerms }) => {
  const { loading, error, data:{countries} = [] } = useQuery(GET_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [colorIndex, setColorIndex] = useState<number>(0)
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const filterCountries = () => {
    if (!countries) return
    setColorIndex((prevIndex) => (prevIndex + 1) % colorPalette.length) ;
    // If no search terms, return all countries
    if (!searchTerms.text) {
      setFilteredCountries(countries)
      return
    }
    // Filter countries by search text
    const filteredCountries = countries.filter((country:Country)=>{
      return country.name.toLowerCase().includes(searchTerms.text)
    })
    // Check if there is a valid grouping field and if not, return filtered countries and alert
    const groupingField = filteredCountries.length && filteredCountries[0][searchTerms.field]
    if(!groupingField) {
      searchTerms.field && toast.info(`' ${searchTerms.field} ' did not match any field.`)
      return setFilteredCountries(filteredCountries)
    }
    // Sort the filtered countries by the grouping field
    filteredCountries.sort((a:Country, b:Country)=> {
      if (Array.isArray(groupingField)) {
        return a[searchTerms.field].length >= b[searchTerms.field].length ? -1 : 1
      } else {
        if ( typeof groupingField === 'object') {
          return a[searchTerms.field].name.localeCompare(b[searchTerms.field].name)
        } else {
          return a[searchTerms.field].localeCompare(b[searchTerms.field])
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
        {filteredCountries.length === 0 && <Typography textAlign={'center'} fontSize={'1.5rem'}>No countries found</Typography>}
    </Stack>
  )
}

export default CountriesList