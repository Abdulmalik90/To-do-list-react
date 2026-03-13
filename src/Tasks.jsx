import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import List from './List';
import { useState, useMemo, useCallback } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
// Dialog Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

    const [tasksCondition, setTasksCondition] = useState("notCompleted");
    const [open, setOpen] = useState(false);
    const [alignment, setAlignment] = useState('uncompleted');
    const [taskState, setTaskState] = useState({
        title: "",
        subtitle: "",
        id: null,
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
            ...taskState.allTasks, {title: taskState.title, subtitle: taskState.subtitle, id: Date.now(),completed: false}
        ]

        localStorage.setItem("todos", JSON.stringify(newTaskList))
        
        setTaskState({
            ...taskState,
            title: "",
            subtitle: "",
            allTasks: newTaskList
        })
    }

    // check button function
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
    // edit button function
    function editButton(id, newTitle, newSubtitle){
        setTaskState(prev => {
            const updatedTasks = prev.allTasks.map((task) => {
                if(task.id === id){
                    
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

    // Edit Button Function
    const [openEdit, setOpenEdit] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: taskState.title,
        subtitle: taskState.subtitle
    });
    

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const title = formJson.title;
        const subtitle = formJson.subtitle;
        editButton(taskState.id, title, subtitle);
        handleCloseEdit();
    };

    const handleEditButton = useCallback((todo) => {
        setTaskState(prev => ({...prev, title: todo.title, subtitle: todo.subtitle, id: todo.id}));
        setEditedTask({title: todo.title, subtitle: todo.subtitle});
        setOpenEdit(true);       
    }, []);

    // delete button function
    function deleteButton(id){
        setTaskState(prev => {
            // Filter keeps everything where the index (i) does NOT equal the deleted id
            const updatedTasks = prev.allTasks.filter((task) => task.id !== id);
            
            localStorage.setItem("todos", JSON.stringify(updatedTasks));
            
            return {
                ...prev,
                allTasks: updatedTasks,
                id: null
            };
        })
    }

    // Delete Button Function
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleOpenDeleteModal = useCallback((todo) => {
        setTaskState(prev => ({ ...prev, id: todo.id }));
        setOpenDeleteModal(true);
    }, []);

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };
    function handleDeleteButton(){
        deleteButton(taskState.id);
        handleCloseDeleteModal();
    }

    // Memoize the task list rendering
    const memoizedTaskList = useMemo(() => {
        return taskState.allTasks.map((task, index) => {
            if (!task) return null;

            if (tasksCondition === "notCompleted") {
                if (!task.completed) {
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.4 }}
                        >
                            <List className="task" checkButton={checkButton} key={task.id} todo={task} index={index} editButton={handleEditButton} deleteButton={handleOpenDeleteModal} />
                        </motion.div>
                    );
                }
            } else if (tasksCondition === "completed") {
                if (task.completed) {
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.4 }}
                        >
                            <List className="task" checkButton={checkButton} key={task.id} todo={task} index={index} editButton={handleEditButton} deleteButton={handleOpenDeleteModal} />
                        </motion.div>
                    );
                }
            } else {
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4 }}
                    >
                        <List className="task" checkButton={checkButton} key={task.id} todo={task} index={index} editButton={handleEditButton} deleteButton={handleOpenDeleteModal} />
                    </motion.div>
                );
            }
            return null;
        });
    }, [tasksCondition, taskState.allTasks, checkButton, handleEditButton, handleOpenDeleteModal]);

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
                        <ToggleButton value="uncompleted" onClick={() => {setTasksCondition("notCompleted")}}>غير منجز</ToggleButton>
                        <ToggleButton value="completed" onClick={() => {setTasksCondition("completed")}}>منجز</ToggleButton>
                        <ToggleButton value="all" onClick={() => {setTasksCondition("allTasks")}}>الكل</ToggleButton>
                        </ToggleButtonGroup>
                    </ThemeProvider>

                <Container style={{margin: "20px auto", display: "flex", justifyContent: "flex-start", flexDirection: "column", maxHeight: "60vh" ,overflowY: "scroll", overflowX: "hidden"}}>
                    <AnimatePresence>
                        {memoizedTaskList}
                    </AnimatePresence>
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

            {/* Delete Modal */}
            <>
                
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
            </>

            {/* Edit Modal */}
            <>
                
                <Dialog style={{direction: "rtl"}} open={openEdit} onClose={handleCloseEdit}>
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
            </>
        </>
    )
}