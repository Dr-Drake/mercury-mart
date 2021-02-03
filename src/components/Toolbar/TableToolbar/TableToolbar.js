import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import useToolbarStyles from './tableToolbar-jss';

export default function TableToolbar(props){
    const classes = useToolbarStyles();
    const { numSelected, title, deleteCallback } = props;

    const handleClick = () => deleteCallback();
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            {title ? title : "Order Status"}
          </Typography>
          
        )}
  
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
  deleteCallback: PropTypes.func
};