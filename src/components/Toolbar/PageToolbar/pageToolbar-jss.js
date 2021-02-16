import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    filterCard:{
        backgroundColor: "#191c24",
        justifySelf: "start",
        '& p':{
            fontSize: "0.8rem", 
            fontWeight: 500,
            margin:"0 0 0 3px",
            color: "#6c7293",
        }
    },

    filterButtonIcon:{
        color: "white",
        fontSize: "1rem",
    },

    filterIcon:{
        fontSize: "1rem",
        color: "#6c7293"
    },

    closeButton:{
        borderRadius: 0,
        height: "30px",
        width: "30px",
    },

    toolbar:{
        display: "grid",
        gridTemplateColumns: "3fr 1fr"
    },

    addProductButton:{
        backgroundColor: "#00d25b",
        zIndex: 0,
        color: "white",
        boxSizing: "border-box",
        '&:hover':{
            backgroundColor: "#00d25b",
        }
    },

    addProductArea:{
        justifySelf: "right",
    }
})

export default useStyles;