import useStyles from './filterPanel-jss';
import { useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function FilterPanel(props){
  const {
    filterCallback,
    filterFields,
  } = props;

  const fields = filterFields ? filterFields : ["ID", "Customer", "Date"];
  const operators = ["contains", "equals", "starts with", "ends with", "greater than", "less than"];

  const classes = useStyles();
  const [field, setField] = useState(fields[0]);
  const [operator, setOperator] = useState("contains");
  const [inputValue, setInput] = useState("");
  
  const handleChange = (event) => {
    setField(event.target.value);
  };
  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  if (filterCallback){
    useCallback(filterCallback(field, operator, inputValue), [field, operator, inputValue])
  }
  

  return(
    <div style={{padding: "6px 8px"}}>
        <TextField
            classes={{root: classes.filterTextField}}
            inputProps={{className:classes.filterInput}}
            InputLabelProps={{classes:{root: classes.filterInput, focused:classes.labelFocus}}}
            InputProps={{classes:{underline: classes.underline}}}
            select
            label="Field"
            value={field}
            size="small"
            onChange={handleChange}
            SelectProps={{
                native: true,
                classes: {icon: classes.selectIcon}
            }}
        >
            {fields.map((option, index) => (
                <option key={index} value={option} className={classes.filterOption}>
                  {option}
                </option>
            ))}
        </TextField>

        <TextField
            classes={{root: classes.filterTextField}}
            inputProps={{className:classes.filterInput}}
            InputLabelProps={{classes:{root: classes.filterInput, focused:classes.labelFocus}}}
            InputProps={{classes:{underline: classes.underline}}}
            select
            label="Operator"
            value={operator}
            size="small"
            onChange={handleOperatorChange}
            SelectProps={{
                native: true,
                classes: {icon: classes.selectIcon},
            }}
        >
            {operators.map((option, index) => (
                <option key={index} value={option} className={classes.filterOption}>
                    {option}
                </option>
            ))}
        </TextField>

        <TextField 
            classes={{root: classes.filterTextField}}
            InputLabelProps={{classes:{root: classes.filterInput, focused:classes.labelFocus}}}
            inputProps={{className:classes.filterInput}}
            InputProps={{classes:{underline: classes.underline}}} 
            size="small" 
            label="Filter value"
            onChange={handleInputChange} 
            value={inputValue}
        />
    </div>
  )
}