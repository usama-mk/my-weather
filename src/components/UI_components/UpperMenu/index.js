import React, {useEffect} from 'react';
import { useLocation,withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SVG from 'react-inlinesvg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import cloudsIcon from '../../../images/clouds.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        marginLeft:'6px'
    }
}));

//Header of the web app
function UpperMenu (props){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const location = useLocation();

// on initialization of the component this sets the value for the tab
// based on the url
    useEffect(()=>{
        if(location.pathname === '/')
            setValue(0);
        else
            setValue(1);
    },[location.pathname]);

    // selection between home and favorites
    const handleChange = (event, value) => {
        if (value === 0) {props.history.push('/')}
        if(value === 1) {props.history.push('/favorites')}
    };


    return (
        <div className={classes.root}>
            <AppBar position="static" style={{height: '55px',background:'grey'}}>
                <Toolbar>
                    <SVG src={cloudsIcon} style={{position:'relative', height:'24px', width:'24px', bottom:'2',fill:"#fff"}}/>
                    <Typography variant="h6" className={classes.title}>
                        My Weather
                    </Typography>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={(e, value)=>handleChange(e, value)}
                        aria-label="nav tabs "
                    >
                        <Tab label="Home" component={Button}  value={0}  />
                        <Tab label="Favorites" component={Button}  value={1} />

                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    )



}
export default withRouter(UpperMenu);