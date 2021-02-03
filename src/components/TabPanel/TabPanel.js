function TabPanel(props) {
    const { children, value, index,  ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    );
}

export default TabPanel;