import * as React from 'react';
import { useState } from 'react';
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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function List({ index, checkButton, todo, editButton, deleteButton }) {

    function handleCheckButtonOnLoad(){
        

        if (todo.completed) {
            return {border:"solid green 1px", borderRadius: "20px", backgroundColor: "green", color: "white"};
        } else {
            return {border:"solid green 1px", borderRadius: "20px", backgroundColor: "white", color: "green"};
        }
    }

    const [styleState, setStyleState] = useState({
        checkButton: handleCheckButtonOnLoad(),
        editButton: {border:"solid blue 1px", borderRadius: "20px", backgroundColor: "white", width: "fit-content"},
        deleteButton: {border:"solid red 1px", borderRadius: "20px", backgroundColor: "white", width: "fit-content"}
    })

    

    function handleCheckButton(){
        checkButton(index);
        
        if (!todo.completed) {
            setStyleState(prev => ({
                ...prev,
                checkButton: {...prev.checkButton, backgroundColor: "green", color: "white"}
                
            }));
        } else {
            setStyleState(prev => ({
                ...prev,
                checkButton: {...prev.checkButton, backgroundColor: "white", color: "green"}
            }));
        }
    }
    
    // Edit Button Function
    const [open, setOpen] = React.useState(false);
    const [editedTask, setEditedTask] = useState({
        title: todo.title,
        subtitle: todo.subtitle
    });
    

    const handleCloseEdit = () => {
        setOpen(false);
    };

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const title = formJson.title;
        const subtitle = formJson.subtitle;
        editButton(index, title, subtitle);
        handleCloseEdit();
    };

    function handleEditButton(){
        setOpen(true);       
    }
    
    // Delete Button Function
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };
    function handleDeleteButton(){
        deleteButton(index);
        handleCloseDeleteModal();
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{ backgroundColor: indigo[900] , color: "white"}} className='todoCard'  variant="outlined" style={{marginBottom: "10px"}}>
                <React.Fragment>
                    <CardContent >
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                            <Grid size={6} style={{textAlign:"center"}}>

                                {/* Delete Button */}
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    <Grid size={{ xs: 1, sm: 4, md: 4 }} style={styleState.deleteButton}>
                                        <IconButton className="iconButton" aria-label="delete" size="small" color='error' onClick={handleOpenDeleteModal}>
                                            <DeleteOutlineIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>

                                    {/* Edit Button */}
                                    <Grid size={{ xs: 1, sm: 4, md: 4 }} style={styleState.editButton}>
                                        <IconButton  className="iconButton" onClick={handleEditButton} aria-label="delete" size="small" color='primary'>
                                            <EditOutlinedIcon fontSize="inherit"  />
                                        </IconButton>
                                    </Grid>

                                    {/* Check Button */}
                                    <Grid size={{ xs: 1, sm: 1, md: 4 }}>
                                        <IconButton className="iconButton" style={styleState.checkButton} onClick={handleCheckButton} aria-label="delete" size="small" color='success'>
                                            <CheckCircleOutlineIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>

                                </Grid>
                                    
                            </Grid>

                            <Grid size={6}>
                                <Typography variant="body2">
                                    <h3 style={{direction: "rtl", textAlign: "right"}}>{todo.title}</h3>
                                    <p style={{direction: "rtl", textAlign: "right"}}>{todo.subtitle}</p>
                                </Typography>
                            </Grid>
                            
                        </Grid>
                        
                        
                        
                        
                    </CardContent>

                    
                </React.Fragment>
            </Card>

            {/* Edit Modal */}
            <React.Fragment>
                
                <Dialog style={{direction: "rtl"}} open={open} onClose={handleCloseEdit}>
                    <DialogTitle>تعديل المهمة</DialogTitle>
                    <DialogContent>
                    
                    <form onSubmit={handleSubmitEdit} id="subscription-form">
                        <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="العنوان الرئيسي "
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedTask.title}
                        onChange={(e)=>{
                            setEditedTask({...editedTask, title: e.target.value})
                        }}
                        />

                        <TextField
                        autoFocus
                        margin="dense"
                        id="subtitle"
                        name="subtitle"
                        label="العنوان الفرعي"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedTask.subtitle}
                        onChange={(e)=>{
                            setEditedTask({...editedTask, subtitle: e.target.value})
                        }}
                        />
                    </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEdit}>إلغاء</Button>
                    <Button type="submit" form="subscription-form">
                        حفظ التعديلات
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {/* Delete Modal */}
            <React.Fragment >
                
                <Dialog
                    style={{direction: "rtl"}}
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"تأكيد حذف المهمة"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        هل أنت متأكد من حذف هذه المهمة؟ لا يمكنك التراجع عن هذا الإجراء.    
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDeleteModal}>إلغاء</Button>
                    <Button onClick={handleDeleteButton} color='error' autoFocus>
                        حذف المهمة
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Container>
    )
}