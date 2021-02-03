import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    logo: {
        color: "white",
        fontWeight: "700",
        textTransform: "uppercase",
        fontSize: "20px"
    },

    link:{
        '&:hover':{
            backgroundColor: "#0f1015",
            '& $menuIcons':{
                color: "white"
            },

            '& $menuItems':{
                color: "white"
            }
        },
    },

    linkSelected:{
        '& .MuiListItemIcon-root':{
            color: "white"
        },

        '& .MuiListItemText-primary':{
            color: "white"
        }
    },

    menuIcons:{
        color: "#6c7293",
    },

    menuItems:{
        fontSize: ".9375rem",
        fontWeight: "500",
        color: "#6c7293"
    },

    subMenuItems:{
        fontSize: ".875rem",
        fontWeight: "500",
        color: "#6c7293"
    },

    divider:{
        backgroundColor: "#6c7293",
    }
})

export default useStyles;