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
    const [taskState, setTaskState] = useState({
        title: "",
        subtitle: "",
        allTasks: JSON.parse(localStorage.getItem("todos")) || [] // getting the tasks from the local storage
    });
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    // adding task button function
    function addTask(){

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
        
        setTaskState(prev => ({
            ...prev, 
            allTasks: prev.allTasks.map((task, i) => {
                if(i === id){
                    if(task.completed){
                        return {...task, completed: false}
                    } else{
                        return {...task, completed: true}
                    }
                } else {
                    return task;
                }
            })
            
        }))
    }
    
    

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
                {taskState.allTasks.map((task, index)=>{
                    return (
                        <List checkButton={checkButton} key={index}  index={index} subtitle={task.subtitle}>{task.title}</List>
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
    )
}