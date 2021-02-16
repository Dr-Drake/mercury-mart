import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({

    catergoryCard:{
        backgroundColor: "#191c24 !important",
        padding: "15px"
    },

    adornment:{
        marginRight: 5,
        color: "white"
    },

    container:{
        flexGrow: 1, padding: 0, background: "#000",
        [theme.breakpoints.down("md")]:{
            padding: 20
        },

    },

    main:{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridGap: "1em",
    },


    pageTitle:{
        fontWeight: 500,
        fontSize: 25,
        color: "white",
    },

    tablecell:{
        borderBottom: "2px solid #2c2e33",
        color: "#6c7293"
    },

    previousButton:{
        color: "white",
        '& h4':{
            color: "white"
        }
    },

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

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

export default useStyles;