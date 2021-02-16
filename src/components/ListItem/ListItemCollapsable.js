import { useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {withRouter} from "next/router";

function ListItemCollapsable(props){

    const {
        criteria,
        listItemProps,
        listIconProps,
        listItemTextProps,
        text,
        Icon,
        router,
        condensed
    } = props;

    var active = criteria.includes(router.pathname);

    const [open, setOpen] = useState(active);
    const handleClick = () => {
        setOpen(!open);
    };

    return(
        <div>
            <ListItem 
                button
                selected={active} 
                onClick={handleClick} 
                {...listItemProps}
            >
                {Icon && <ListItemIcon {...listIconProps}>
                   <Icon />
                </ListItemIcon>}
                { !condensed && <ListItemText
                inset={Icon ? false : true} 
                primary={text} 
                {...listItemTextProps} />}
                {open ? <ExpandLess {...listIconProps} /> : <ExpandMore {...listIconProps} />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                {props.children}
            </Collapse>
        </div>
    )
}

export default withRouter(ListItemCollapsable);