import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   main:{
       display: "grid",
       gridTemplateColumns: "7fr 3fr",
       gridGap: "1em",
   },

   leftSection:{
       display: "grid",
       gridGap: "1em"
   },

   topLeft:{
       display: "grid",
       gridTemplateColumns: "3fr 7fr",
       gridGap: "1em",
   },

   rightSection:{
       display: "grid",
       gridTemplateColumns: "1fr",
       gridGap: "1em",
   },

   modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default useStyles;