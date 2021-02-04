import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    tablecell:{
        borderBottom: "2px solid #2c2e33",
        color: "#6c7293"
    },

    card:{
        backgroundColor: "#191c24",
        padding: "15px"
    },

    main:{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridGap: "1em",
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

    selectIcon:{
        color: "white !important"
    },

    options:{
        fontSize: ".825rem",
        backgroundColor: "#191c24",
        color: "#6c7293"
    },

    helperText:{
        color: "#6c7293"
    },
}))

export default useStyles;