import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import CountriesList from './components/CountryList';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SearchTerms } from './helper/types';

function App() {
  const [query, setQuery] = useState('')
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({ text: '', field: '' });

  function extractSearchAndField(userInput: string):SearchTerms {
    if (userInput === '') {
      return { text: '', field: '' };
    }
    const trimmedInput = userInput.trim().toLowerCase();
    // Split text and field with regex
    const parts = trimmedInput.match(/^search:(.+?) group:(.*?)$/);
    // Check if input is in the correct format
    if (!parts) {
      toast.warn('Invalid input format. Please use "search:<text> group:<field>"');
      return { text: '', field: '' };
    }
    return {
      text: parts[1].trim(),
      field: parts[2].trim(),
    };
  }

  const handleSearchClick = () => {
    const { text, field } = extractSearchAndField(query);
    setSearchTerms({text, field});
  }

  const handleClearClick = () => {
    setQuery('');
    setSearchTerms({text: '', field: ''});
  }

  return (
    <Container maxWidth='xl'>
        <Stack direction={'column'} gap={4} py={6}>
            <Typography variant='h1' fontSize={'2.5rem'} textAlign={'center'} fontWeight={'500'}>COUNTRIES</Typography>
            <Stack direction={'row'} gap={2} justifyContent={'center'} alignItems={'flex-start'}>
              <TextField 
                value={query} 
                type='text' 
                size='small' 
                variant="outlined" 
                sx={{width:'40%', maxWidth: 'lg'}}
                placeholder='search:<text>  group:<field>' 
                helperText='Please search for keyword and grouping field as requested.(search:<text>  group:<field>)'
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              />
              <Button variant='contained' onClick={handleSearchClick}>
                Search
              </Button>
              <Button variant='contained' color='warning' onClick={handleClearClick} >
                Clear
              </Button>
            </Stack>
            <CountriesList searchTerms={searchTerms}/>
        </Stack>
    </Container>
  );
}

export default App;
