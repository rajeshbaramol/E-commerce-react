import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});
export const UserCart = (props) => {
  const classes = useStyles();
  let all = JSON.parse(localStorage.getItem('cart')) || [];
  let cartitem = all.filter((x) => x.id === localStorage.getItem('user'))[0];
  const [cartitems, setstate] = useState(cartitem);

  const handlechange = (value, prod, name) => {
    prod.quantity = value;
    all = all
      .filter((x) => x.id === localStorage.getItem('user'))
      .map((p) => {
        return {
          ...p,
          procucts:
            name === 'delete'
              ? p.procucts.filter((p1) => p1.productId !== prod.productId)
              : p.procucts.map((p2) =>
                  p2.productId === prod.productId ? prod : p2
                ),
        };
      });
    setstate(all.filter((x) => x.id === localStorage.getItem('user'))[0]);
    localStorage.setItem('cart', JSON.stringify(all));
  };

  return (
    <div>
      <Header {...props}></Header>
      <List>
        {cartitems.procucts.length>0?cartitems.procucts.map((x) => (
          <ListItem>
            <Grid container spacing={1} xs={12}>
              <Grid container xs={4}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.root}
                      component='img'
                      alt={x.product.image}
                      height='250'
                      width='100%'
                      image={x.product.image}
                      title={x.product.image}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid container xs={8}>
                <Card style={{ width: '100%' }}>
                  <CardContent>
                    <Typography gutterBottom variant='subtitle2' component='h2'>
                      {x.product.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='caption'
                      color='textSecondary'
                      component='p'
                    >
                      {x.product.description}
                    </Typography>
                    <Button size='small' color='primary'>
                      Price ₹{x.product.price} /-
                    </Button>
                    <Button size='small'>no Offer</Button>
                  </CardContent>
                  <CardContent>
                    Quantity
                    <Button
                      onClick={() => handlechange(Number(x.quantity) + 1, x, 'update')}
                    >
                      <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </Button>
                    {x.quantity}
                    <Button
                      onClick={() => handlechange(Number(x.quantity) -1, x, 'update')}
                    >
                      <RemoveIcon></RemoveIcon>
                    </Button>
                    {/* <TextField
                      label={'Quantity'}
                      id='quantity'
                      name='quantity'
                      value={x.quantity}
                      onChange={(e) => handlechange(e, x, 'update')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='start'>
                            <RemoveIcon></RemoveIcon>
                          </InputAdornment>
                        ),
                      }}
                      type={'number'}
                      variant='outlined'
                    ></TextField> */}
                    <Button size='small' color='primary'></Button>
                    <Button size='small'>no Offer</Button>
                  </CardContent>
                  <CardContent>
                    <Button
                      size='small'
                      color='secondary'
                      onClick={(e) => handlechange(e, x, 'delete')}
                    >
                      Remove from the cart
                      <DeleteIcon></DeleteIcon>
                    </Button>
                    <Button size='small'></Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </ListItem>
        )):'Your cart list is Empty'}
      </List>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserCart);
