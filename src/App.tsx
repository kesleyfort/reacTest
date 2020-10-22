import React from 'react';
import 'date-fns';
import './App.css';
import SearchAddress from "./SearchAddress";
import {
    CardActions,
    Grid,
    Menu,
    MenuItem,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent, DialogActions, TextField, Accordion, AccordionSummary, AccordionDetails
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Add, Close, Delete, Edit, ExpandMore, MoreVert, Save } from "@material-ui/icons";
import { CardHeader } from "semantic-ui-react";
import { FirestoreService } from "./firestore";
import firebase from "./firebase";
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AuthService } from './AuthService';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            minWidth: 350,
            margin: theme.spacing(2, 1, 0, 1)
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        expandToFullWidth: {
            width: 'inherit'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        picker: {
            width: "9rem",
            marginBottom: 0
        }
    }),
);
function getNewDate(date: any) {
    return new Date(date.seconds * 1000).toLocaleDateString();
}
interface Event {
    titulo: string
    horario: string
    data: string
    local: string

}
function App() {
    new AuthService().getAuth().onAuthStateChanged(a => {
            if(a!==null) {
                new FirestoreService().getEvents(a.uid).then(value => {
                    setUser(a)
                    setEvents(value.docs)
            })
        }})
    const classes = useStyles();
    const [events, setEvents] = React.useState<firebase.firestore.QueryDocumentSnapshot[]>([]);
    const [user, setUser] = React.useState<firebase.User>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = React.useState(false)
    const [, setSelectedEvent] = React.useState<firebase.firestore.QueryDocumentSnapshot>()
    const handleClickOpenDialog = (event: any) => {
        setOpen(true);
        if (event != null)
            setSelectedEvent(event)
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const deleteEvent = (
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
        id: string,
    ) => {
        if(user!==undefined)
        new FirestoreService().deleteEvent(user?.uid, id)
    };
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2020-10-18T21:00:00'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const saveEvent = (event: any) => {
        if(user!==undefined)
            new FirestoreService().setEvents(event, user.uid)
    }
    const toDoDialog = (toDo: any) => {
        if (toDo !== null)
            return (<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Novo evento</DialogTitle>
                <DialogContent>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Detalhes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid
                                container
                                direction="row"
                                justify="space-evenly"
                                alignItems="flex-end"
                                spacing={1}
                            >
                                <TextField className={classes.picker} value={toDo.titulo} multiline id="tituloEvento" label="Titulo do evento" placeholder="Titulo" InputLabelProps={{
                                    shrink: true,
                                }} />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        className={classes.picker}
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Data do evento"
                                        value={getNewDate(toDo.data)}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        className={classes.picker}
                                        ampm={false}
                                        margin="normal"
                                        id="time-picker"
                                        label="Horário do evento"
                                        value={toDo.horario}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'modifica o horário',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Localização</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SearchAddress />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Observações</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                fullWidth
                                id="observacoesEvento"
                                label="Observações"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={toDo.observacoes}
                            />
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<Close />}
                        onClick={handleCloseDialog}
                    >
                        Fechar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<Save />}
                        onClick={saveEvent}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>)
        else {
            return (<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Novo evento</DialogTitle>
                <DialogContent>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Detalhes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid
                                container
                                direction="row"
                                justify="space-evenly"
                                alignItems="flex-end"
                                spacing={1}
                            >
                                <TextField className={classes.picker} multiline id="tituloEvento" label="Titulo do evento" placeholder="Titulo" InputLabelProps={{
                                    shrink: true,
                                }} />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        className={classes.picker}
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Data do evento"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        className={classes.picker}
                                        ampm={false}
                                        margin="normal"
                                        id="time-picker"
                                        label="Horário do evento"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'modifica o horário',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Localização</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SearchAddress />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Observações</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                fullWidth
                                id="observacoesEvento"
                                label="Observações"
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<Close />}
                        onClick={handleCloseDialog}
                    >
                        Fechar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<Save />}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>)
        }
    }
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch">
            <Grid item>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            To-do app
                        </Typography>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                                size="medium"
                            >
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
            >
                <Grid className={classes.expandToFullWidth}>
                    <Card className={classes.root}>
                        <CardHeader>

                        </CardHeader>
                        <CardContent>
                            <div>
                                <List dense>
                                    {events.map((value1) => {
                                        return <ListItem divider button>
                                            <ListItemText
                                                primary={value1.get("titulo") + " - (" + value1.get("horario") + ")"}
                                                secondary={(value1.get("data") !== undefined ? getNewDate(value1.get("data")) : "1") + " - " + value1.get("local")}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpenDialog(value1)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={(event) => deleteEvent(event, value1.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    })
                                    }
                                </List>
                            </div>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleClickOpenDialog(null)}>
                                <Add />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                {toDoDialog(null)}
            </Grid>
        </Grid>

    );
}

export default App;
