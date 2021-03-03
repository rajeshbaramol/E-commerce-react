import {
  CssBaseline,
    InputAdornment,
  List,
  ListItem,
  Paper,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { onChange } from '../redux/actions/ProcuctAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const AirbnbSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
  space:{
      padding:'2%'
  }
})(Slider);
function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className='bar' />
      <span className='bar' />
      <span className='bar' />
    </span>
  );
}

export const SideLayout = (props) => {
  const classes = useStyles();
  const handleChange = (...args) => {
    console.log(args)
    props.onChange({
        name:'priceBetween',value:args[1]
    })
  };
  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <List>
        <ListItem>
          <div className={classes.margin} />
          <Typography id='track-inverted-range-slider' gutterBottom>
            Price
          </Typography>
        </ListItem>
        <ListItem>
          <div className={classes.margin} />
          <TextField variant="outlined" label='Min' className={classes.space} 
          value={props.data.priceBetween[0]}
          onChange={(e)=>props.onChange({name:'priceBetween',value:[e.target.value,props.data.priceBetween[1]]})}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}/>
          <div className={classes.margin} />
          <TextField variant="outlined" label='Max' className={classes.space}
          value={props.data.priceBetween[1]}
          onChange={(e)=>props.onChange({name:'priceBetween',value:[props.data.priceBetween[0],e.target.value]})}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}/>
        </ListItem>
        <ListItem>
          <AirbnbSlider
            ThumbComponent={AirbnbThumbComponent}
            getAriaLabel={(index) =>
              index === 0 ? 'Minimum price' : 'Maximum price'
            }
            onChange={handleChange}
            value={props.data.priceBetween}
            defaultValue={[0, 100]}
            min={0}
  max={500}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

const mapStateToProps = (state) =>  ({
    data: state.ProductReducer.toJS(),
  });;

const mapDispatchToProps = {
    onChange
};

export default connect(mapStateToProps, mapDispatchToProps)(SideLayout);
