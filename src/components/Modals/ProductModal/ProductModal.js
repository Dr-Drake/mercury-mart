import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { CardContent, CardHeader } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useStyles from './productModal-jss';

/*const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));*/

export default function ProductModal(props) {
  const {
    open,
    handleClose
  } = props
  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);
  //const handleClose = () =>{ setOpen(false)}

  return (
    <div>
        <Dialog
        //fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-product-dialog-title"
        disableBackdropClick
        maxWidth="lg"
      >
        <DialogTitle id="add-product-dialog-title">{"Add Product"}</DialogTitle>
        <DialogContent>
          <div id="product-main" className={classes.main}> 
 
            <div id="left-section" className={classes.leftSection}>

              <div id="top-left" className={classes.topLeft}>

                  <div style={{backgroundColor: "yellow", padding: "50px"}}>

                  </div>
                  <div style={{backgroundColor: "green", padding: "50px"}}>

                  </div>

                </div>
                <div id="bottom-left" style={{backgroundColor: "red", padding: "50px"}}>

                </div>
            </div>

            <div id="right-section" className={classes.rightSection}>
                <div style={{backgroundColor: "blue", padding: "50px", alignSelf: "start"}}></div>
            </div>

          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
