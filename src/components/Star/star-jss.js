import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    ratingIcon: {
        color: "#6c7293",
        fontSize: ".875rem",
        margin: "0 .25rem 0 0",
        cursor: "pointer",
        '&:hover':{
            fill: "orange"
        }
    },

    filledRating:{
        fill: "orange",
        color: "#6c7293",
        fontSize: ".875rem",
        margin: "0 .25rem 0 0",
        cursor: "pointer",
    }
})

export default useStyles;