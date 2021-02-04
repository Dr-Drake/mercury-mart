import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    imageDiv:{
        '& img':{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            //borderRadius: "50%",
            boxSizing: "border-box",
        }
    },

    nameCellDiv:{
        display: "flex",
        alignItems: "center",
        padding: 0,
        width: "100%"
    },

    nameCell:{
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