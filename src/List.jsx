import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Margin } from '@mui/icons-material';
import { indigo } from '@mui/material/colors';
export default function List({children, subtitle, index, checkButton}){

    function handleCheckButton(){
        checkButton(index)
    }

    
    return (
        <Container maxWidth="sm">
            <Card variant="outlined" style={{marginBottom: "10px"}}>
                <React.Fragment>
                    <CardContent sx={{ backgroundColor: indigo[900] , color: "white"}}>
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                            <Grid size={6} style={{textAlign:"center"}}>
                                
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    <Grid size={{ xs: 1, sm: 4, md: 4 }} style={{border:"solid red 1px", borderRadius: "20px", backgroundColor: "white"}}>
                                        <IconButton aria-label="delete" size="small" color='error'>
                                            <DeleteOutlineIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                    <Grid size={{ xs: 1, sm: 4, md: 4 }} style={{border:"solid blue 1px", borderRadius: "20px", backgroundColor: "white"}}>
                                        <IconButton onClick={handleCheckButton} aria-label="delete" size="small" color='primary'>
                                            <EditOutlinedIcon fontSize="inherit"  />
                                        </IconButton>
                                    </Grid>
                                    <Grid size={{ xs: 1, sm: 4, md: 4 }} style={{border:"solid green 1px", borderRadius: "20px", backgroundColor: "white"}}>
                                        <IconButton aria-label="delete" size="small" color='success'>
                                            <CheckCircleOutlineIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                    
                            </Grid>

                            <Grid size={6}>
                                <Typography variant="body2">
                                    <h3 style={{direction: "rtl", textAlign: "right"}}>{children}</h3>
                                    <p style={{direction: "rtl", textAlign: "right"}}>{subtitle}</p>
                                </Typography>
                            </Grid>
                            
                        </Grid>
                        
                        
                        
                        
                    </CardContent>

                    
                </React.Fragment>
            </Card>
        </Container>
    )
}