import List from '@material-ui/core/List';
import ListItemLink from "../ListItem/ListItemLink";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemCollapsable from '../ListItem/ListItemCollapsable';
import Link from "next/link";
import useStyles from './collection-jss';

export default function Collection(props){
    const { 
        list,
        condensed
    } = props;
    const classes = useStyles();
    const listItemProps = {
        classes : {root: classes.link, selected: classes.linkSelected},
    }
    const listIconProps = {
        classes: { root: classes.menuIcons }
    }

    const listItemTextProps = {
        classes: {primary: classes.menuItems}
    }


    if (!list){
        return(
            <List>
            </List>
        )
    }

    const generateLink = (link, index, itemClasses, iconClasses, textClasses)=>{
        var Icon = link.icon;
        var itextClass = {primary: classes.subMenuItems};

        if (!link.subitems){
            return(
                <Link key={index} href={link.href} passHref>
                    <ListItemLink 
                        button 
                        key={index}
                        component="a" 
                        classes={ itemClasses ? itemClasses :
                            {root: classes.link, selected: classes.linkSelected}
                        }
                    >
                        {Icon && <ListItemIcon classes={ iconClasses ? iconClasses :
                            {root: classes.menuIcons}
                            }>
                            <Icon />
                        </ListItemIcon>}

                        { !condensed && <ListItemText
                        inset={Icon ? false : true}
                        classes={ textClasses ? textClasses :
                            {primary: classes.menuItems}
                        } 
                        primary={link.text} />}

                    </ListItemLink>
                </Link>
            )
        }

        var criteria = [];
        for (var i = 0; i < link.subitems.length; i++){
            if (link.subitems[i].href){
                criteria.push(link.subitems[i].href)
            }
        };

        return(
            <ListItemCollapsable 
            criteria={criteria}
            text={link.text}
            Icon={link.icon}
            listIconProps={listIconProps}
            listItemTextProps={listItemTextProps}
            listItemProps={listItemProps}
            condensed={condensed}
            >
                <List>
                    {link.subitems.map((item, i)=>{
                        return generateLink(item, i+index, false, false, itextClass);
                    })}
                </List>
            </ListItemCollapsable>
            
        )
    }

    return(
        <List>
            {list.map((item, index)=>{
                return generateLink(item, index);
            })}
        </List>
    )
}