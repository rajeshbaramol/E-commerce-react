import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Categories } from '../components/Categories';
import Header from '../components/Header';
import ItemView from '../components/ItemView';
import { SideLayout } from '../components/SideLayout';
import { onChange } from '../redux/actions/ProcuctAction';

export const ProductList = (props) => {
  let { category } = props.data;
  useEffect(() => {
    try {
      if (props.data.productList.length === 0) {
        fetch(`https://fakestoreapi.com/products/${category || ''}`)
          .then((res) => res.json())
          .then((res) => {
            props.onChange({ name: 'productList', value: res });
          });
      }
    } catch (error) {
      
    }
    
  }, [category, props, props.data.category]);

  return (
    <div>
      <Header {...props}></Header>
      <Grid container spacing={1} xs={12}>
        <Grid xs={12}spacing={2}>
          <Categories {...props}>hello</Categories>
        </Grid>
        <Grid container item md={2} spacing={2}>
          <SideLayout {...props}></SideLayout>
        </Grid>
        <Grid container item md={10}>
          {props.data.productList &&
            props.data.productList.filter(x=>x.price>=props.data.priceBetween[0]&&x.price<=props.data.priceBetween[1]).map((prod, index) => (
              <Grid item key={index} spacing={1}>
                <ItemView prod={prod} {...props}></ItemView>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.ProductReducer.toJS(),
});

const mapDispatchToProps = {
  onChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
