import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import useStyles from './tableBackbone-jss';
import Checkbox from '@material-ui/core/Checkbox';
import { useState, useMemo } from 'react';
import TableToolbar from '../../Toolbar/TableToolbar/TableToolbar';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Comparing values
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * @param {*} array 
 * @param {*} comparator 
 */
function stableSort(array, comparator) {

    // Grounp elements (row cells) with thier index in one array.
    // An array of arrays.
    const stabilizedThis = array.map((el, index) => [el, index]);

    /**
     * We pass a comparator function.
     * Pretty much, the result of the function will have to be either 1, 0, or -1.
     */
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    // Return the sorted array
    return stabilizedThis.map((element) => element[0]);
}

export default function SkeletonTabelBackBone(props){
    const { 
        headRow,
        bodyRows,
        enableCheckBoxPading,
        generateCellsCallback,
        rowIndentifier,
        title,
        isLoading,
        enableEmptyRows,
        deleteItemsCallback,
        enableEditing,
        editCallback 
    } = props;
    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headCells = headRow 
    const rows = bodyRows
    const rowId = rowIndentifier ? rowIndentifier : headCells[0].id

    const generateCells = (row, labelId) =>{
        var cells = [];
        var count = 1;
        for (var cell in row){
            
            if (count === 1){
                cells.push(
                    <TableCell 
                    //style={{width: "30%"}}
                    key={labelId} 
                    component="th" 
                    id={labelId} 
                    scope="row"
                    classes={{root:classes.tableCell}}
                    >
                        {
                           isLoading ?
                           <Skeleton count={1} /> :
                           row[cell]
                        }
                        
                    </TableCell>          
                )
            } else {
                cells.push(
                    <TableCell align="left" classes={{root:classes.tableCell}}  key={labelId} >
                        {
                            isLoading ?
                            <Skeleton count={1} /> :
                            row[cell] 
                        }
                    </TableCell>          
                )
            }

            count++;
            
        }
        return cells
    }
    const handleSort = (property) => (event) =>{
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n[rowId]);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };

    const handleEdit = (event, rowId) =>{
        event.stopPropagation();
        editCallback(rowId);
    }

    const deleteCallback = () =>{
        setSelected([]);
        deleteItemsCallback(selected);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows =  rows ? rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage):
    0
    

    return(
        <Card classes={{root: classes.card}}>
            <TableToolbar 
            numSelected={enableCheckBoxPading ? selected.length : 0}
            title={title}
            deleteCallback={deleteCallback} 
            />
            <TableContainer>
                <Table>
                <TableHead>
                <TableRow>
                    {
                        enableCheckBoxPading &&
                        <TableCell 
                            padding="checkbox"
                            classes={{root: classes.headerCell}}
                        >
                            <Checkbox
                            classes={{root: classes.checkbox}}
                            indeterminate={selected.length > 0 && selected.length < rows.length}
                            checked={rows.length > 0 && selected.length === rows.length}
                            onChange={handleSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                            />
                        </TableCell>
                    }
                    {headCells.map((headCell) => (
                    <TableCell
                        classes={{root: classes.headerCell}}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={handleSort(headCell.id)}
                        classes={{
                            icon: classes.sortLabelIcon,
                            active: classes.sortLabelActive, 
                            root: classes.sortLabel,
                        }}
                        >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                        
                        </TableSortLabel>
                    </TableCell>
                    ))
                    }
                    {
                        enableEditing &&
                        <TableCell 
                            padding="checkbox"
                            classes={{root:classes.headerCell}}
                        >
                        </TableCell>
                    }
                </TableRow>
                </TableHead>
                    <TableBody>
                    { !isLoading ? stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = enableCheckBoxPading ? isSelected(row[rowId]) : false
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, row[rowId])}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[rowId]}
                        selected={isItemSelected}
                        >
                            {
                                enableCheckBoxPading &&
                                <TableCell 
                                    padding="checkbox"
                                    classes={{root:classes.bodyCell}}
                                >
                                    <Checkbox
                                    classes={{root: classes.checkbox}}
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                            }
                            {
                                generateCellsCallback ?
                                generateCellsCallback(row, labelId) :
                                generateCells(row, labelId)
                            }
                            {
                                enableEditing &&
                                <TableCell 
                                    padding="checkbox"
                                    classes={{root:classes.bodyCell}}
                                >
                                    <Tooltip title="edit">
                                        <IconButton 
                                            aria-label="edit" 
                                            classes={{root:classes.editIconButton}}
                                            onClick={(event)=> handleEdit(event, row[rowId])}
                                        >
                                            <EditIcon classes={{root: classes.editIcon}} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            }
                        
                        </TableRow>
                    )
                    }) :
                    [...Array(rowsPerPage).keys()].map((num)=>{
                        return(
                            <TableRow>
                                {
                                    enableCheckBoxPading &&
                                    <TableCell 
                                        padding="checkbox"
                                        classes={{root:classes.bodyCell}}
                                    >
                                        <Checkbox
                                        classes={{root: classes.checkbox}}
                                        />
                                    </TableCell>
                                }
                                {
                                    generateCellsCallback ?
                                    generateCellsCallback({...[...Array(rowsPerPage).keys()]}) :
                                    [...Array(rowsPerPage).keys()].map((num)=>(
                                        <TableCell align="left">
                                            <Skeleton />
                                        </TableCell> 
                                    ))
                                }
                                {
                                    enableEditing &&
                                    <TableCell 
                                        padding="checkbox"
                                        classes={{root:classes.bodyCell}}
                                    >
                                        <IconButton 
                                            aria-label="edit" 
                                            classes={{root:classes.editIconButton}}
                                            onClick={handleEdit}
                                        >
                                            <EditIcon classes={{root: classes.editIcon}} />
                                        </IconButton>
                                    </TableCell>
                                }
                        
                            </TableRow>
                        )
                    })
                    }
                    { //<TableRow style={{ height: (53) * emptyRows }}>
                    enableEmptyRows && emptyRows > 0 && (
                        <TableRow style={{ height: (53) * emptyRows}}>
                        <TableCell colSpan={6} classes={{root: classes.bodyCell}} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                {
                    !isLoading ?
                    <TablePagination
                    classes={{
                        toolbar: classes.tablePagination,
                        menuItem: classes.paginationMenu,
                        selectIcon: classes.tablePagination
                    }}
                    SelectProps={{
                        MenuProps: { classes: { paper: classes.selectDropdown } }
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> :
                    <TablePagination
                    classes={{
                        toolbar: classes.tablePagination,
                        menuItem: classes.paginationMenu,
                        selectIcon: classes.tablePagination
                    }}
                    SelectProps={{
                        MenuProps: { classes: { paper: classes.selectDropdown } }
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rowsPerPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                }
            </TableContainer>
        </Card>
    )   
}

SkeletonTabelBackBone.propTypes = {
    headRow:PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any.isRequired,
        numeric: PropTypes.bool,
        disablePadding: PropTypes.bool,
        label: PropTypes.any.isRequired
    })),
    bodyRows: PropTypes.arrayOf(PropTypes.object),
    enableCheckBoxPading: PropTypes.bool,
    enableEmptyRows: PropTypes.bool,
    generateCellsCallback: PropTypes.func,
    rowIndentifier: PropTypes.any,
    title: PropTypes.any,
    deleteItemsCallback: PropTypes.func,
    enableEditing: PropTypes.bool,
    editCallback: PropTypes.func
};