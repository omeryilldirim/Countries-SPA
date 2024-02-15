import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider, Stack } from '@mui/material';
import colorPalette from '../helper/colorPalette';

const CountryCard = ({country, selectedCountry, setSelectedCountry, color, setColorIndex, index}) => {
    const checkAndTruncateArray = (arr) => arr.length > 8 ? arr.slice(0, 8).join(', ') + `...[${arr.length}]` : arr.join(', ')
    const states = country.states.map((state)=> state.name)
    const truncatedArray = checkAndTruncateArray(states)

    const handleCountryClick = () => {
        if (selectedCountry === country.code) {
            setSelectedCountry(null)
        } else {
            setSelectedCountry(country.code)
            setColorIndex((prevIndex) => (prevIndex + 1) % colorPalette.length);
        }
    }

    return (
        <Card sx={{ width: 300, backgroundColor: selectedCountry === country.code ? color : 'white' }}>
            <CardActionArea onClick={handleCountryClick} style={{height:'100%', display:'flex', justifyContent: 'flex-start', alignItems:'flex-start'}}>
                <CardContent style={{width:'100%', height:'100%'}}>
                    <Typography textAlign={'center'} fontSize={'30px'}>
                        {country.emoji}
                    </Typography>
                    <Typography textAlign={'center'} variant="h6">
                        {index+') '}{country.name}
                    </Typography>
                    <Divider />
                    <Stack direction={'column'} gap={0.5} mt={1}>
                        <Typography variant="body2" color="text.secondary">
                            Continent: {country.continent.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Code: {country.code}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Currency: {country.currency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: {country.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Languages: {country.languages.map((lang)=> lang.name ).join(', ')}
                        </Typography>
                        {country.states.length > 0 && 
                            <Typography variant="body2" color="text.secondary">
                                States: { truncatedArray }
                            </Typography>
                        }
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CountryCard