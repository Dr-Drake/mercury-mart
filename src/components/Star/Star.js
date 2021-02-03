import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import StarIcon from '@material-ui/icons/Star';
import useStyles from './star-jss';
import { useState, useEffect } from 'react';

export default function Star(props){
    const classes = useStyles();
    const {
        clickable, 
        filled,
        variable, 
        key,
        index,
        callBack, 
        ...others} = props;
        
    const [selected, setSelected] = useState(false);

    useEffect(()=>{
        setSelected(filled);
    }, [filled])

    const handleClick = ()=>{
        setSelected(!selected);
    }

    const handleOtherClick = ()=>{
        callBack(index);
    }

    if (clickable){
        return(
            <span key={key}>
                {
                    selected ?
                    <StarIcon 
                        classes={{root:classes.filledRating}}
                        onClick={handleClick} 
                        {...others} 
                    />
                    :
                    <StarOutlineOutlinedIcon
                        classes={{root: classes.ratingIcon}}
                        onClick={handleClick} 
                        {...others}
                    />
                }
            </span>
            
        )
    }

    if (variable){
        return(
            <span key={key}>
                {
                    selected ?
                    <StarIcon 
                        classes={{root:classes.filledRating}}
                        onClick={handleOtherClick}
                        {...others} 
                    />
                    :
                    <StarOutlineOutlinedIcon
                        classes={{root: classes.ratingIcon}}
                        onClick={handleOtherClick}
                        {...others}
                    />
                }
            </span>
        )
    }

    // Default is not clickable nor variable
    return(
        <span key={key}>
            {
                selected ?
                <StarIcon 
                    classes={{root:classes.filledRating}}
                    {...others} 
                />
                :
                <StarOutlineOutlinedIcon
                    classes={{root: classes.ratingIcon}}
                    {...others}
                />
            }
        </span>
    )
}