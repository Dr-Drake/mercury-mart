import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    card:{
        padding: "0 10px",
    },

    field:{
        marginBottom: 8,
    },

    submitButton:{
        color: "white",
        backgroundColor: "#D06645",
        '&:hover':{
            backgroundColor: "#D06645",
        }
    },
}))

export default useStyles;