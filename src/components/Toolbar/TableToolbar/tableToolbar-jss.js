import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      highlight:{
        backgroundColor: "rgb(217, 83, 79, 0.85)"
      },

      title: {
        flex: '1 1 100%',
        color: "white",
        fontWeight: 500,
        fontSize: "1.125rem"
      },
})

export default useStyles;