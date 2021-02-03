import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './pageToolbar-jss';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { useState, useCallback} from 'react';
import AddIcon from '@material-ui/icons/Add';
import FilterPanel from '../FilterPanel/FilterPanel';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';


export default function PageToolbar(props){
  const {
    filterFields,
    applyFilters,
    resetFilters,
    enableSecondAction,
    actionTitle,
    actionCallback
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
  const handleAction = () =>{ actionCallback()}



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

      {
        enableSecondAction &&
        <div className={classes.addProductArea}>
          <Button 
          aria-label="add product" 
          onClick={handleAction}
          classes={{root: classes.addProductButton}}
          >
              {actionTitle}
          </Button>
        </div>
      }
        
    </div>
  )
}

PageToolbar.propTypes = {
  filterFields: PropTypes.func,
  applyFilters: PropTypes.func,
  resetFilters: PropTypes.func,
  enableSecondAction: PropTypes.bool,
  actionTitle: PropTypes.string,
  actionCallback: PropTypes.func,
};