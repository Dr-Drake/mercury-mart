import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './orderFilterToolbar-jss';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { useState, useCallback, useMemo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import FilterPanel from '../FilterPanel/FilterPanel';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Card from '@material-ui/core/Card';


export default function OrderToolbar(props){
  const {
    filterFields,
    applyFilters,
    resetFilters,
    SecondActionComponent,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const panelLimit = filterFields ? filterFields.length : 3;
  let filters = [];
  const indexes = [];
  
  const handleClick = () => setOpen(!open);
  const hanldeAddFilter = () =>{ setCount(count >= panelLimit ? count : count + 1)}
  const handleClose = () => setCount(count - 1);
  const hanldeApplyFilter = ()=>{
    applyFilters(filters);
  }
  const handleResetFilter = () =>{ resetFilters() }
  const handleAddProduct = () =>{ addProductAction() }


  const generateFilterPanels = useCallback(
    ()=>{
      let panels = [];
     // let newFilters = [];
      
      // Reset filter list
      //filters = [];
      for (let i = 0; i < count; i++){

        const callback = (field, operator, inputValue) =>{
          
          if (indexes.includes(i)){
            filters = filters.filter((filter)=>filter.index != i)
            filters.push({index: i, field, operator, inputValue})
          } else{
            indexes.push(i);
            filters.push({index: i, field, operator, inputValue})
          }
      }
        panels.push(
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div style={{display: "flex"}}> 
              <IconButton classes={{root: classes.closeButton}} onClick={handleClose}>
                <CloseIcon classes={{root: classes.filterIcon}} />
              </IconButton>
              <FilterPanel filterFields={filterFields} filterCallback={callback} />
            </div>
          </Collapse>
        )
      }
      return panels;
    }
  , [count, open, indexes]) 
  
  return(
    <div className={classes.toolbar}>

      <Card style={{backgroundColor: "#191c24"}} classes={{root: classes.filterCard}}>
        <Tooltip title="Filter">
            <Button aria-label="filter" onClick={handleClick}>
              <FilterListIcon classes={{root: classes.filterButtonIcon}} />
              <p style={{color: "white"}}>Filter</p>
            </Button>
        </Tooltip>
        { generateFilterPanels() }
        <Collapse in={open} timeout="auto" unmountOnExit>
            <div>
              <div className={classes.filterCard}> 
                  <Button aria-label="add filter" onClick={hanldeAddFilter}>
                    <AddIcon classes={{root: classes.filterIcon}} />
                    <p>ADD FILTER</p>
                  </Button>
                  {
                    count > 0 &&
                    <Button aria-label="apply filter" onClick={hanldeApplyFilter}>
                      <PlayArrowIcon classes={{root: classes.filterIcon}} />
                      <p>APPLY FILTER</p>
                    </Button>
                  }
                  {
                    count > 0 &&
                    <Button aria-label="reset filter" onClick={handleResetFilter}>
                      <RotateLeftIcon classes={{root: classes.filterIcon}} />
                      <p>RESET FILTERS</p>
                    </Button>
                  }
              </div>
            </div>
        </Collapse>
      </Card>

      <div style={{backgroundColor: "transparent"}}>
        {
          SecondActionComponent && <SecondActionComponent />
        }
      </div>

      
        
    </div>
  )
}


/*const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
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
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Nutrition
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };*/