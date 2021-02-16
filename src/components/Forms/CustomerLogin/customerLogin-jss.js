import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    card:{
        padding: "0 10px",
        //backgroundColor: "#191c24",
    },

    cardHeader:{
        //color: "white"
    },

    field:{
        marginBottom: 8,
    },

    checkbox:{
        //color: '#6c7293',
       /* '&$checked': {
            color: '#6c7293',
        },*/
    },

    checked: {},

    visibilityIcon:{
        //color: "white"
    },

    textField:{
       /* '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },*/
    },

    inputLabel:{
        //color: "white",
    },

    inputField:{
        //color: "white",
    },

    submitButton:{
        color: "white !important",
        backgroundColor: "#D06645 !important",
        width: "100%",
        '&:hover':{
            backgroundColor: "#D06645",
        }
    },

    backdrop: {
        zIndex: "1000 !important",
        color: '#fff',
    },
}))

export default useStyles;