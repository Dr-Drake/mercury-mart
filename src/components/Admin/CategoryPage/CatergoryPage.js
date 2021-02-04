import AddCategory from '../../Views/AddCategory/AddCategory';
import Grid from '@material-ui/core/Grid';
import PageToolbar from '../../Toolbar/PageToolbar/PageToolbar';
import CategoryTable from '../../Tables/CatergoryTable/CategoryTable';
import React from 'react';
import mapToField from '../../../utils/mapToField';
import formatDate from '../../../utils/formatDate';
import { useCategories } from '../../../hooks/dataFetch';
import { actions } from '../../../redux/AdminActionCreators'
import { connect } from 'react-redux';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from './categoryPage-jss';


// Action creators
const { loadCategories, loadCategoryFilter, deleteCategory } = actions

const mapStateToProps = (dataStore) =>({
  ...dataStore
});

const mapDispatchToProps = {
  loadCategories, loadCategoryFilter,
  deleteCategory
}



function CategoryPage(props){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false)
    const fields = ["name", "description", "date"];
    const relevantKeys = ["categoryId", "categoryName", "categoryDescription", "createdAt"]

    const map = {
        "categoryId": "id",
        "categoryName": "name",
        "categoryDescription": "description",
        "createdAt" : "date"
    }
    
    const { categories, isLoading, isError } = useCategories();

    React.useEffect(()=>{
        
        if (isLoading === false){
            let seen = [];
            let data = [];

            for (let i = 0; i < categories.length; i++){
                let category = categories[i];
                if (seen.includes(category.categoryId) === false){
                    seen.push(category.categoryId);
                    let mapped = mapToField(map, category, relevantKeys);
                    data.push({...mapped, date:formatDate(category.createdAt) })
                }
            }
            
            props.loadCategories(data);
            props.loadCategoryFilter(data);
            //setTableData(data);
            //filteredData = data
        }
    }, [isLoading, categories])

    let filteredData = props.categories;

    const formatFilter = (field, operator, inputValue)=>{
        let lowerField = field;

        if (typeof(field) !== "string"){
            lowerField = field.toString();
        }

        switch(operator){
            case "contains":
                return lowerField.toLowerCase().includes(inputValue);
            
            case "equals":
                return lowerField.toLowerCase() === inputValue
            
            case "starts with":
                return lowerField.toLowerCase().startsWith(inputValue);

            case "greater than":
                return lowerField.toLowerCase() > inputValue;

            case "less than":
                return lowerField.toLowerCase() < inputValue;
            
            default:
                return lowerField.toLowerCase().endsWith(inputValue);
        }
    }


    const applyFilters = (filters) =>{
        //console.log(filters)

        for (let i = 0; i < filters.length; i++){
            filteredData = filteredData.filter((row)=>{
                //console.log(row[filters[i].field])
                return formatFilter(row[filters[i].field], filters[i].operator, filters[i].inputValue);
            })
        }

        props.loadCategoryFilter(filteredData);
    }

    const resetFilters = () =>{
        props.loadCategoryFilter(props.categories)
    }

    const addCategoryCallback = () =>{
        setActiveStep(1);
    }

    const prevCallback = () =>{
        setActiveStep(0)
    }

    const loadingCallback = (status)=>{
        setIsDeleting(status)
    };


    return(
        <div style={{background: "#000"}} >
            <Backdrop className={classes.backdrop} open={isDeleting} >
                <BoxLoading />
            </Backdrop>
            {
                activeStep === 0 ?
                <div style={{flexGrow: 1, padding: 20}}>
                    <Grid container spacing={3}>
                        
                        <Grid xs={12} item>
                            <PageToolbar 
                                filterFields={fields} 
                                applyFilters={applyFilters} 
                                resetFilters={resetFilters}
                                actionCallback={addCategoryCallback}
                                actionTitle="ADD CATEGORY"
                                enableSecondAction
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <CategoryTable 
                            data={props.categoriesFilter} 
                            isLoading={isLoading} 
                            loadingCallback={loadingCallback}
                            deleteCategory={props.deleteCategory}
                            categories={props.categories}
                            />
                        </Grid>

                    </Grid>
                </div>
                :
                <AddCategory prevCallback={prevCallback} />
        
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);