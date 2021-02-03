import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   icon:{
       fontSize: "3.65rem",
       color: "#ffab00"
   },

   summaryIcon: {
       color: "#6c7293",
       fontSize: ".875rem",
       margin: "0 .25rem 0 0",
   },

   title:{
       fontSize: ".875rem",
       fontWeight: 400,
       color: "white",
       margin: 0,
       padding: 0,
       textAlign: "right",
   },

   value:{
       fontSize: "1.5rem",
       fontWeight: 500,
       color: "white",
       margin: 0,
       padding: 0,
       textAlign: "right"
   },

   summary:{
       color: "#6c7293",
       fontSize: ".875rem",
       margin: "1rem 0 0 0",
       fontWeight: 400,
   },

   card:{
       backgroundColor: "#191c24",
   },

})

export default useStyles;