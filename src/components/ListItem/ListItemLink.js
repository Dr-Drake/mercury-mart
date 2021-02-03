import {withRouter} from "next/router";
import ListItem from '@material-ui/core/ListItem';

function ListItemLink(props){

    const {router, href} = props;

    return(
        <ListItem
        selected={router.pathname === href}
        {...props} />
    )
}

export default withRouter(ListItemLink);