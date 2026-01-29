import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import List from './List';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function Tasks(){
    const theme = createTheme({
        palette: {
            primary: {
                main: grey[600]
            },

            secondary: {
                main: red[500]
            }
        }
    })

    const [alignment, setAlignment] = useState('uncompleted');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    
    return (
        <Container maxWidth="sm">
            <ThemeProvider theme={theme}>
                <ToggleButtonGroup
                    color="secondary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    >
                    <ToggleButton value="uncompleted">غير منجز</ToggleButton>
                    <ToggleButton value="completed">منجز</ToggleButton>
                    <ToggleButton value="all">الكل</ToggleButton>
                    </ToggleButtonGroup>
                </ThemeProvider>

            <Container style={{margin: "20px auto", display: "flex", justifyContent: "center", flexDirection: "column", height: "60vh", paddingTop: "20px", maxHeight:"700px" ,overflow: "scroll"}}>
                <List>hello</List>
                <List>hello</List>
                <List>hello</List>
                <List>hello</List>
                <List>hello</List>
            </Container>

            <Container>
                <Grid container spacing={1} columns={12}>
                    <Grid size={3}>
                        <Button style={{width: "100%", height: "100%"}} variant='contained'>إضافة</Button>
                    </Grid>
                    <Grid size={9}>
                        <TextField style={{width: "90%"}} id="outlined-basic" label="عنوان المهمة" variant="outlined" />
                    </Grid>
                </Grid>
            </Container>

        </Container>
    )
}