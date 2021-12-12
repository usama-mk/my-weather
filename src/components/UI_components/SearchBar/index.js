import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toast from '../../helpers/toast';
import {AutoCompleteSearch} from '../../Weather_API';
import { useDispatch } from 'react-redux';
import { setCity } from '../../../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: `5em`
            }
        }
    },
    searchField:{
        width:'400px'
        
    }

}));



const SearchBar= props =>{

    const classes = useStyles();
    const dispatch= useDispatch();

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [text, setText] = useState('');
    const loading = options !== undefined ? open && options.length === 0 : '';

    useEffect(() => {
        if(text.length!==0) {
            AutoCompleteSearch(text)
                .then(data => data!== undefined ? setOptions(data) : [])
                .catch(err => Toast.error(err));
        }

    }, [text]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleCityChange = (e, value) =>{
        if(value)
        dispatch(setCity(value.AdministrativeArea.LocalizedName))
    };

    return (
        <form  style={{margin: 'auto' }}  noValidate autoComplete="off">
            <Autocomplete
                id="asynchronous-demo"
                className={classes.searchField}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) =>option !== null ? option.AdministrativeArea.LocalizedName : ''}
                onChange={(e, value)=>handleCityChange(e,value)}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        style={{marginBottom:'30px'}}
                        label="Enter a City"
                        variant="outlined"
                        value={text}
                        onChange={e=>setText(e.target.value)}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                    />
                )}
            />
        </form>
    );



};
export default SearchBar;









