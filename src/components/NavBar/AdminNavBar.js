import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styles from './adminNavBar-jss';

const useStyles = makeStyles({
    primary: {
        color: "white",
        fontWeight: "700",
        textTransform: "uppercase",
        fontSize: "20px"
    }
})

function AdminNavBar(props){
    const Icon = (
        <span><img src="/logo.png" style={{width: "30px"}} /></span>
    );

    const classes = useStyles();

    return(
        <nav style={{backgroundColor: "white"}}>
            <ListItem style={{ 
                backgroundColor: "yellow", 
                paddingTop: "5px", 
                paddingBottom: "5px",
                overflow: "hidden"
                }}>
                <ListItemIcon>{Icon}</ListItemIcon>
                <ListItemText
                classes={{primary: classes.primary}} 
                primary={props.name? props.name : "Tech Store"} 
                />
            </ListItem>
        </nav>
    )
}

export default AdminNavBar