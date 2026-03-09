import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import List from './List';
import { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


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

    const [open, setOpen] = useState(false);
    const [alignment, setAlignment] = useState('uncompleted');
    const [taskState, setTaskState] = useState({
        title: "",
        subtitle: "",
        completed: false,
        allTasks: JSON.parse(localStorage.getItem("todos")) || [] // getting the tasks from the local storage
    });
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    // adding task button function
    function addTask(){

        if(!taskState.title) {
            setOpen(true);

            setTimeout(()=>{
                setOpen(false);
            }, 5000)

            return;
        };

        const newTaskList = [
            ...taskState.allTasks, {title: taskState.title, subtitle: taskState.subtitle, completed: false}
        ]

        localStorage.setItem("todos", JSON.stringify(newTaskList))
        
        setTaskState({
            ...taskState,
            title: "",
            subtitle: "",
            allTasks: newTaskList
        })
    }

    function checkButton(id){
        
        setTaskState(prev => {
            const updatedTasks = prev.allTasks.map((task, i) => {
                if(i === id){
                    if(task.completed){
                        return {...task, completed: false}
                    } else{
                        return {...task, completed: true}
                    }
                } else {
                    return task;
                }
            });
            localStorage.setItem("todos", JSON.stringify(updatedTasks));
            return {
                ...prev,
                allTasks: updatedTasks
            };
        })
    }
    
    function editButton(id, newTitle, newSubtitle){
        setTaskState(prev => {
            const updatedTasks = prev.allTasks.map((task, i) => {
                if(i === id){
                    
                    return {...task, title: newTitle, subtitle: newSubtitle}
                    
                } else {
                    return task;
                }
            });
            localStorage.setItem("todos", JSON.stringify(updatedTasks));
            return {
                ...prev,
                allTasks: updatedTasks
            };
        })
    }

    return (
        <>
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

                <Container style={{margin: "20px auto", display: "flex", justifyContent: "flex-start", flexDirection: "column", height: "60vh", maxHeight:"700px" ,overflow: "scroll"}}>
                    {taskState.allTasks.map((task, index)=>{
                        if(!task) return null;

                        return (
                            <List checkButton={checkButton} key={index} todo={task} index={index} editButton={editButton}/>
                        )
                    })}
                    
                </Container>

                <Container>
                    <Grid container spacing={1} columns={12}>
                        <Grid size={3}>
                            <Button onClick={addTask} style={{width: "100%", height: "100%"}} variant='contained'>إضافة</Button>
                        </Grid>
                        <Grid size={9}>
                            <TextField onChange={(e)=>{
                                setTaskState({...taskState, title:e.target.value})
                            }} value={taskState.title} style={{width: "90%"}} id="outlined-basic" className={""} label="عنوان المهمة" variant="outlined" />
                        </Grid>
                    </Grid>
                </Container>

            </Container>

            {/* Alert */}
            <Collapse in={open} style={{position: "absolute", bottom: "650px", left: "50%", transform: "translateX(-50%)"}}>
                <Alert severity='warning'
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                يرجى إدخال عنوان المهمة قبل إضافتها
                </Alert>
            </Collapse>
        </>
    )
}