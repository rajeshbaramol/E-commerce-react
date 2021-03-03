import { Button, Container, Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import CustomInput from '../components/CustomInput';
import RegularButton from '../components/RegularButton';
import { dataChange, onChange } from '../redux/actions/LoginAction';
import { validateEmail, validateLength } from '../utils/validation';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

export const LoginComponent = (props) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let { emailError, passwordError, step } = props.form;

    if (name === 'email') {
      emailError = validateEmail(value);
    }
    if (name === 'password') {
      passwordError = validateLength(value, 5, 9);
    }
    if (step === 'login') {
      props.onChange({
        name,
        value,
        emailError,
        passwordError,
      });
    }
    if (step !== 'login') {
      let signIn = props.form.signIn;
      if (signIn[name] === undefined) {
        Object.keys(signIn).forEach((x) => {
          if (typeof signIn[x] === 'object' && signIn[x][name] !== undefined)
            signIn[x][name] = value;
        });
      } else signIn[name] = value;
      props.dataChange({ name: 'signIn', value: signIn });
    }
  };
  const Submit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let { email, password, step } = props.form;
    if (step === 'login') {
      props.dataChange({
        name: 'token',
        value: email + new Date().toDateString() + password,
      });
      let user = users.find(
        (x) => (x.username || x.email) === email && x.password === password
      );
      if (user) {
        localStorage.setItem('user', email);
        localStorage.setItem(
          'token',
          email + new Date().toDateString() + password
        );
        props.history.push('products');
      }
    } else if (step !== 'login') {
      //         var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Access-Control-Allow-Origin", "*");
      //       fetch('https://fakestoreapi.com/users', {
      //         method: 'POST',
      //         headers: myHeaders,
      //         body: JSON.stringify(props.form.signIn),
      //       })
      //         .then((res) => res.json())
      //         .then((json) => console.log(json));

      users.push(props.form.signIn);
      localStorage.setItem('users', JSON.stringify(users));
      props.dataChange({ name: 'step', value: 'login' });
    }
  };
  //   function curryOnPattern(obj, fn) {
  //     return function curriedFunc(obj) {
  //         if(typeof obj)
  //         return (remainingKeys.length > 0)
  //             ? curryOnPattern(remainingKeys, compose(fn, assign(obj)))
  //             : fn(obj);
  //     }
  // }
  // const jsxObj=(key,value)=>(
  //     <CustomInput
  //     key
  //     label={key}
  //     id={key}
  //     name={key}
  //     formControlProps={{
  //       fullWidth: true,
  //     }}
  //     value={value}
  //     onChange={handleChange}
  //     type='text'
  //     error={Boolean(props.form.emailError)}
  //     helperText={props.form.emailError}
  //   />
  // )

  return (
    <Container maxWidth='sm'>
        <Paper elevation={4}>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ShoppingBasketIcon
          style={{ fontSize: 60, placeSelf: 'center', color: 'yellowgreen' }}
        ></ShoppingBasketIcon>
        {props.form.step === 'login' ? (
          <>
            {' '}
            <CustomInput
              label='Email'
              id='email'
              name='email'
              formControlProps={{
                fullWidth: true,
              }}
              value={props.form.email}
              onChange={handleChange}
              type='text'
              error={Boolean(props.form.emailError)}
              helperText={props.form.emailError}
            />
            <CustomInput
              label='Password'
              id='password'
              name='password'
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleChange}
              type='password'
              error={props.form.passwordError}
              helperText={props.form.passwordError}
            />
            <RegularButton
              type='button'
              color='primary'
              className='form__custom-button'
              onClick={Submit}
            >
              Log in
            </RegularButton>
            <Button
              onClick={() => {
                props.dataChange({
                  name: 'step',
                  value: 'signIn',
                });
              }}
            >
              signIn
            </Button>
          </>
        ) : (
          <>
            {[...Object.keys(props.form.signIn)].map((x, i) =>
              typeof props.form.signIn[x] == 'object' ? (
                <>
                  {[...Object.keys(props.form.signIn[x])].map(
                    (y, j) =>
                      typeof props.form.signIn[x][y] !== 'object' && (
                        <CustomInput
                          key={i + '' + j}
                          label={y}
                          id={y}
                          name={y}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          value={props.form.signIn[x][y]}
                          onChange={handleChange}
                          type='text'
                          error={Boolean(props.form[y + 'Error'])}
                          helperText={props.form[y + 'Error']}
                        />
                      )
                  )}
                </>
              ) : (
                typeof props.form.signIn[x] !== 'object' && (
                  <CustomInput
                    key={i}
                    label={x}
                    id={x}
                    name={x}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={props.form.signIn[x]}
                    onChange={handleChange}
                    type='text'
                    error={Boolean(props.form[x + 'Error'])}
                    helperText={props.form[x + 'Error']}
                  />
                )
              )
            )}
            <RegularButton
              type='button'
              color='primary'
              className='form__custom-button'
              onClick={Submit}
            >
              SignIn
            </RegularButton>
            <Button
              onClick={() => {
                props.dataChange({
                  name: 'step',
                  value: 'login',
                });
              }}
            >
              Already have account?
            </Button>
          </>
        )}
      </form>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  form: state.Loginreducer.toJS(),
});

const mapDispatchToProps = {
  onChange,
  dataChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
