import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import CountriesList from './components/CountriesList';
import { useState } from 'react';

interface SearchTerms {
  text: string;
  field: string;
}

function App() {
  const [query, setQuery] = useState('')
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({ text: '', field: '' });

  function extractSearchAndField(userInput: string): SearchTerms {
    if (userInput === '') {
      return { text: '', field: '' };
    }
    // Remove leading and trailing whitespaces
    const trimmedInput = userInput.trim().toLowerCase();
  
    // Convert input to lowercase for case-insensitive parsing
    // userInput = userInput.toLowerCase();
  
    // Split into text and field parts using a regular expression
    const parts = trimmedInput.match(/^search:(.+?) group:(.+)$/);

    // Check if valid input format is matched
    if (!parts) {
      alert('Invalid input format. Please use "search:<text> group:<field>"');
      throw new Error('Invalid input format. Please use "search:<text> group:<field>"')
    }
  
    // Extract text and field, handling optional field-name capitalization
    return {
      text: parts[1].trim(),
      field: parts[2].trim(),
    };
  }

  const handleSearch = () => {
    try {
      const { text, field } = extractSearchAndField(query);
      setSearchTerms({text, field});
    } catch (error) {
      console.error(error);
    }
  }

  const clearFilter = () => {
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
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                variant='contained'
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                variant='contained'
                onClick={clearFilter}
                color='warning'
              >
                Clear
              </Button>
            </Stack>
            <CountriesList searchTerms={searchTerms}/>
        </Stack>
    </Container>
  );
}

export default App;
