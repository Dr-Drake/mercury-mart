import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({

    inputLabel:{
        color: "white !important",
    },

    inputField:{
        color: "white !important",
    },

    textField:{
        '& label.Mui-focused': {
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
        },
    },

    actionButtons:{
        color: "#6c7293"
    },

    paper:{
        backgroundColor: "#191c24",
    },

    dialogTitle:{
        color: "white"
    },

    backdrop: {
        zIndex: 10000,
        color: '#fff',
    },
}))

export default useStyles;