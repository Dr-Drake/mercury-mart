import StoreIcon from '@material-ui/icons/Store';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const menuList = [
    {
        text: "Home", 
        icon: HomeIcon, 
        href: "/admin",
    },
    {
        text: "Orders", 
        icon: StoreIcon, 
        href: "/admin/orders"
    },
    {
        text: "Products", 
        icon: LocalOfferIcon, 
        subitems:[
            {
                text: "All products",
                href: "/admin/products"
            },
            {
                text: "Categories",
                href: "/admin/categories"
            }
        ]
    },
    {
        text: "Customers", 
        icon: PeopleIcon, 
        href: "/admin/customers",
    },
    {
        text: "Analytics", 
        icon: AssessmentIcon, 
        subitems:[
            {
                text: "Dashboard",
                href: "/admin/dashboard"
            },
            {
                text: "Reports",
                href: "/admin/reports"
            },
        ]
    },
    
    
]

export default menuList;