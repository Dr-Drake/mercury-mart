import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    avatarDiv:{
        '& img':{
            width: "25px",
            height: "25px",
            objectFit: "cover",
            borderRadius: "50%",
            boxSizing: "border-box",
        }
    },

    clientCellDiv:{
        display: "flex",
        alignItems: "center",
        padding: 0
    },

    clientCell:{
        //textAlign: "center",
        paddingLeft: "5px",
        width: "100%"
    },

    tableCell:{
        borderBottom: "2px solid #2c2e33",
        color: "#6c7293",
    }

})

export default useStyles;