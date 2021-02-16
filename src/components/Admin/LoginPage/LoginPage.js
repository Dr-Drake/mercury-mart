import Typography from '@material-ui/core/Typography';
import useStyles from './loginPage-jss';
import { useTheme } from '@material-ui/core/styles'
import CustomerRegister from '../../Forms/CustomerRegister/CustomerRegister';
import AdminLogin from '../../Forms/AdminLogin/AdminLogin';
import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/AdminActionCreators'

// Action creators
const { loadCategories, loadProducts } = actions
const mapStateToProps = (dataStore) =>({
  ...dataStore
});
const mapDispatchToProps = {
  loadCategories, loadProducts
}

function LoginPage(props){

    const theme = useTheme();
    const classes = useStyles(theme);
    const Logo = (
      <span><img src="/mercury-icon.png" style={{width: "30px", margin: "3px 0 0 3px"}} /></span>
  );

    return(
        <div className={classes.container} >
          <div className={classes.branding} >
            {Logo}
            <Typography variant="h6" noWrap>
                Mercury Mart
            </Typography>
          </div>
          <AdminLogin />
        </div>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);