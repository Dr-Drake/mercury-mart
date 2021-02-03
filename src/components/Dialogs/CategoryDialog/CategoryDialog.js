import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './categoryDialog-jss';
import TextField from '@material-ui/core/TextField';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { mutate } from 'swr';

export default function CategoryDialog(props) {
    const {
        data,
        open,
        closeCallback,
        successCallback
    } = props

    const theme = useTheme();
    const classes = useStyles(theme);
    const [isEditing, setIsEditing] = React.useState(false);
    const [valOpen, setValOpen] = React.useState(false);
    const [errOpen, setErrOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [name, setName] = React.useState(null)
    const [description, setDescription] = React.useState(null)
    const [errors, setErrors] = React.useState({
        name: false,
        description: false
    })

    // Refs
    const formRef = React.useRef(null);

    const validationClose = () =>{ setValOpen(false)}
    const handleErrClose = () =>{setErrOpen(false)}
    const handleSuccessClose = ()=>{ setSuccessOpen(false)}

    const handleClose = () =>{
        closeCallback();
    }
    const handleNameChange = (e) =>{
        unhighlight(e);
        setName(e.target.value)
    }
    const handleDescriptionChange = (e) =>{
        unhighlight(e);
        setDescription(e.target.value)
    }

    const handleExited = () =>{
        setName(null);
        setDescription(null);
        setErrors({
            name: false,
            description: false
        })
    }

    const validateInputs = () =>{
        const form = formRef.current
        const fdata = new FormData(form);
        let count = 0;
        let clone = {}
        for (let [key, value] of fdata){
            if (/^\s*$/.test(value)){
                count ++;
                clone[key] = true
            } else{
                clone[key] = false
            }
        }
        setErrors(clone)

        if (count > 0){
            return false
        } else{
            return true
        }
        
    }

    const unhighlight = (e) =>{
        const { name } = e.target
        if (errors[name]){
            setErrors((prevState) => ({
                ...prevState,
                [name]: false
            }))
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsEditing(true);
        const val = validateInputs();

        if (val){
            const form = formRef.current
            const fdata = new FormData(form);
            let payload = {
                categoryId: data.id,
                categoryName: fdata.get("name"),
                categoryDescription: fdata.get("description")
            }

            let url = process.env.CATEGORY_API + `/${data.id}`

            axios({
                method: 'put',
                url: url,
                data: payload,
                })
            .then((response)=>{
                mutate(process.env.CATEGORY_API);
                setIsEditing(false)
                closeCallback();
                setSuccessOpen(true);
            })
            .catch((err)=>{
                setIsEditing(false);
                setErrOpen(true);
            })
        } else{
            setIsEditing(false)
            setValOpen(true)
        }
    
    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={isEditing} >
                <BoxLoading />
            </Backdrop>
            <Snackbar
                open={valOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleClose}
            >
                <Alert severity="error" onClose={validationClose}>
                    Please fill in all the required fields
                </Alert>
            </Snackbar>
            <Snackbar
                open={errOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleErrClose}
            >
                <Alert severity="error" onClose={handleErrClose}>
                   An error occured while editing the category
                </Alert>
            </Snackbar>
            <Snackbar
                open={successOpen}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                onClose={handleSuccessClose}
            >
                <Alert severity="success" onClose={handleSuccessClose}>
                   Category successfully edited
                </Alert>
            </Snackbar>
        
            <Dialog 
            //onClose={handleClose} 
            aria-labelledby="category-dialog-title" 
            open={open}
            onExited={handleExited}
            classes={{paper:classes.paper}}
            >
                <DialogTitle 
                    id="category-dialog-title"
                    classes={{root: classes.dialogTitle}}
                >
                    Edit Category
                </DialogTitle>
                <DialogContent>
                <form ref={formRef}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            required
                            value={name || name === '' ? name : data.name}
                            error={errors.name}
                            classes={{root: classes.textField}}
                            id="edit-category-name"
                            variant="outlined"
                            label="Name"
                            fullWidth
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                                classes:{root:classes.inputLabel}
                            }}
                            InputProps={{
                                name: "name",
                                classes:{root:classes.inputField}
                            }}
                            onChange={handleNameChange}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={description || description === '' ? description : data.description}
                                error={errors.description}
                                classes={{root: classes.textField}}
                                id="eidt-category-description"
                                variant="outlined"
                                label="Description"
                                multiline
                                rows={6}
                                fullWidth
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                    classes:{root:classes.inputLabel}
                                }}
                                InputProps={{
                                    name: "description",
                                    classes:{root:classes.inputField},
                                }}
                                onChange={handleDescriptionChange}
                            />
                        </Grid>
                    </Grid>
                </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} classes={{root:classes.actionButtons}} >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} classes={{root:classes.actionButtons}} >
                        Save
                    </Button>
                </DialogActions>
            
            </Dialog>
        </React.Fragment>
    );
}

CategoryDialog.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool.isRequired,
    successCallback: PropTypes.func,
    closeCallback: PropTypes.func
};

