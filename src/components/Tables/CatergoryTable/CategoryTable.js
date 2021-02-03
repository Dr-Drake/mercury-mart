import SkeletonTableBackbone from '../TableBackbone/SkeletonTableBackbone';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import axios from 'axios';
import { mutate } from 'swr';
import React from 'react';
import CategoryDialog from '../../Dialogs/CategoryDialog/CategoryDialog';

export default function CategoryTable(props){

    const {
        data,
        isLoading,
        loadingCallback,
    } = props;

    const [editable, setEditable] = React.useState({});
    const [open, setOpen] = React.useState(false);

    //const classes = useStyles();
    const headerColumns = [
        { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    ]

    const editCallback = (rowId) =>{
        let selectedCategory = props.categories.find((category)=>{
            return category.id === rowId
        })
        setEditable(selectedCategory);
        setOpen(true);
    }

    const closeCallback = () =>{
        setOpen(false)
    }

    const deleteItemsCallback = (selected) =>{
        loadingCallback(true);
        let payload = [];
        let selectedCategories = data.filter((category)=>{
            return selected.includes(category.id)
        })

        for (let i = 0; i < selectedCategories.length; i++){
            payload.push(selectedCategories[i].id)
        }

        axios.post(process.env.DELETE_CATEGORY, payload)
        .then((response)=>{
            //props.deleteCategory(selected)
            mutate(process.env.CATEGORY_API)
            loadingCallback(false);
        })
        .catch((error)=>{
            alert("There was an error")
            loadingCallback(false);
        })

    }
    

    return(
       <SkeletonTheme color="#E0E0E0" highlightColor="#444">
           <CategoryDialog
            data={editable}
            open={open}
            closeCallback={closeCallback}
           />
            <SkeletonTableBackbone
            enableEditing
            enableCheckBoxPading
            enableEmptyRows
            isLoading={isLoading}
           // generateCellsCallback={generateCells}
            headRow={headerColumns}
            bodyRows={data}
            deleteItemsCallback={deleteItemsCallback}
            editCallback={editCallback}
            title="Categories"
            /> 
       </SkeletonTheme>
    )
}

CategoryTable.propTypes={
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
    })),
}