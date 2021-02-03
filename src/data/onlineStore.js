import SettingsIcon from '@material-ui/icons/Settings';

const onlineStore = [
    {
        text: "Online Store", 
        icon: DashboardIcon, 
        subitems:[
            {
                text: "Themes",
                icon: SettingsIcon,
                href: "/admin/store/themes"
            },
            {
                text: "Preferences",
                icon: SettingsIcon,
                href: "/admin/store/preferences"
            },
        ]
    },
]