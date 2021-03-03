import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { onChange } from '../redux/actions/ProcuctAction';
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: '2%',
  },
});

function ItemView(props) {
  const classes = useStyles();
  const handleChange = (e, data) => {
    let prevProds = JSON.parse(localStorage.getItem('cart')) || [];
    prevProds = prevProds.filter((x) => x.id === localStorage.getItem('user'));
    let procucts =
      prevProds.length > 0
        ? prevProds[0].procucts.filter((x) => x.productId === data.id)
        : [];
    if (procucts.length > 0) {
      procucts = procucts.map((x) =>
        x.productId === data.id ? { ...x, quantity: x.quantity++ } : x
      );
    } else{
      procucts=[...prevProds[0].procucts]
      procucts.push({
        productId: data.id,
        product: data,
        quantity: 1,
      });}
    if (prevProds.length > 0)
      prevProds = prevProds.map((x) =>
        x.id === localStorage.getItem('user') ? { ...x, procucts } : x
      );
    else
      prevProds.push({
        id: localStorage.getItem('user'),
        procucts,
      });
    localStorage.setItem('cart', JSON.stringify(prevProds));
    props.onChange({ name: 'cart', value: prevProds });
    if(e.target.innerText.toLowerCase()==='buy now'){
      props.history.push('/cart')
    }
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={props.prod.image}
          height='200'
          image={props.prod.image}
          title={props.prod.image}
        />
        <CardContent>
          <Typography gutterBottom variant='subtitle2' noWrap component='h2'>
            {props.prod.title}
          </Typography>
          <Typography
            gutterBottom
            variant='caption'
            noWrap
            color='textSecondary'
            component='p'
          >
            {props.prod.description}
          </Typography>
          <Button size='small' color='primary'>
            ₹{props.prod.price}
          </Button>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          variant='text'
          color='secondary'
          onClick={(e) => handleChange(e, props.prod)}
        >
          <ShoppingCartIcon />
          Add to Cart
        </Button>
        <Button size='small' variant='contained' color='primary' onClick={(e) => handleChange(e, props.prod)}>
          <FlashOnIcon />
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  data: state.ProductReducer.toJS(),
});

const mapDispatchToProps = {
  onChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
