import { fromJS } from 'immutable';
const defaultState = fromJS({
  username: '',
  password: '',
  emailError: null,
  passwordError: null,
  step: 'login',
  signIn:{
    email:'',
    password:'',
    username:'',
    name:{
        firstname:'',
        lastname:''
    },
    // address:{
    //     city:'',
    //     street:'',
    //     number:3,
    //     zipcode:'',
    //     geolocation:{
    //         lat:'-37.3159',
    //         long:'81.1496'
    //     }
    // },
    phone:''
}
});

export default defaultState;
