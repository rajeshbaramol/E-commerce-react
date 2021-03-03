import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { onChange } from '../redux/actions/ProcuctAction';
import { makeStyles } from '@material-ui/core/styles';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
export const Categories = (props) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    newValue = newValue === 0 ? '' : newValue;
    props.onChange({ name: 'category', value: newValue });
    fetch(
      `https://fakestoreapi.com/products/${
        newValue.length > 0 ? 'category/' + newValue : ''
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        props.onChange({ name: 'productList', value: res });
      });
  };

  useEffect(() => {
    if (props.data.categories.length === 0) {
      fetch('https://fakestoreapi.com/products/categories')
        .then((res) => res.json())
        .then((res) => {
          props.onChange({ name: 'categories', value: res });
        });
    }
  }, [props]);
  return (
    <Box className={classes.root}>
      <Tabs value={props.data.category||0} onChange={handleChange}>
        <Tab label={'Categories'}>
          <Typography>Categories</Typography>
        </Tab>
        {props.data.categories &&
          props.data.categories.map((x) => (
            <Tab key={x} label={x} value={x} {...a11yProps(x)}></Tab>
          ))}
      </Tabs>
    </Box>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
