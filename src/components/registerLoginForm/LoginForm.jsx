import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  StyledButton,
  StyledButtonVisibility,
  StyledContainer,
  StyledContainerPassword,
  StyledCorrect,
  StyledError,
  StyledField,
  StyledFieldPassword,
  StyledForm,
  StyledFormDiv,
  StyledHeader,
  Styledlabel,
  StyledRequired,
} from './RegisterLoginForm.styled';
import { login } from 'redux/auth/operations';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SVG } from 'images';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-hot-toast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8D9698'
    }
  },
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('This is an ERROR email')
    .required('Please enter your email')
    .matches(/^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/),
  password: Yup.string()
    .min(8, 'Need to be more than 8 symbols!')
    .required('Please enter your password')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [noUser, setNoUser] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StyledContainer>
      <StyledHeader>Log In</StyledHeader>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnChange={false}
        validateOnBlur={true}
        validationSchema={LoginSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            setIsLoading(true);
            const response = await dispatch(
              login({
                email: values.email,
                password: values.password,
              })
            );
            console.log(response)
            if (response.meta.requestStatus !== 'rejected') {
              resetForm();
              navigate('/calendar/month/:currentDate');
            } else {
              if (response.payload.includes('401')) {
                console.log("emaiiil")
                toast.error("Email or password is uncorrect");
                setNoUser(true);
              } else {
                toast.error("Sorry, problem at server");
              }
              
            }
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            toast.error("Sorry, problem at server");
          }
        }}
      >
        {({ errors, touched }) => {
          if (isLoading) {
            return <Loader />
          } else {
            return (
              <StyledForm>
                <StyledFormDiv>
                  <Styledlabel
                    htmlFor="email"
                    $validate={
                      (errors.email === 'Please enter your email' &&
                        touched.email &&
                        'empty') ||
                      (((errors.email &&
                        (errors.email === 'This is an ERROR email' ||
                          errors.email.includes('match'))) ||
                        noUser) &&
                        'error') ||
                      (touched.email && 'okay')
                    }
                  >
                    Email
                  </Styledlabel>
                  <StyledField
                    name="email"
                    type="email"
                    placeholder="nadiia@gmail.com"
                    $validate={
                      (errors.email === 'Please enter your email' &&
                        touched.email &&
                        'empty') ||
                      (((errors.email &&
                        (errors.email === 'This is an ERROR email' ||
                          errors.email.includes('match'))) ||
                        noUser) &&
                        'error') ||
                      (touched.email && 'okay')
                    }
                  />
                  {(errors.email === 'Please enter your email' &&
                    touched.email && (
                      <StyledRequired>{errors.email}</StyledRequired>
                    )) ||
                    (errors.email &&
                      (errors.email === 'This is an ERROR email' ||
                        errors.email.includes('match')) && (
                        <StyledError>This is an ERROR email</StyledError>
                      )) ||
                    (noUser && (
                      <StyledError>Email or password is uncorrect</StyledError>
                    )) || (touched.email &&
                      <StyledCorrect>This is an CORRECT email</StyledCorrect>)}
                </StyledFormDiv>
                <StyledFormDiv>
                  <Styledlabel
                    htmlFor="password"
                    $validate={
                      (errors.password === 'Please enter your password' &&
                        touched.password &&
                        'empty') ||
                      (((errors.password && touched.password) || noUser) &&
                        'error') ||
                      (touched.password && 'okay')
                    }
                  >
                    Password
                  </Styledlabel>
                  <StyledContainerPassword $validate={
                    (errors.password === 'Please enter your password' &&
                      touched.password &&
                      'empty') ||
                    (errors.password && touched.password && 'error') ||
                    (touched.password && 'okay')
                  }>
                    <StyledFieldPassword
                      name="password"
                      type={!visibility ? "password" : "text"}
                      placeholder="• • • • • • •"
                    />
                    <StyledButtonVisibility type="button" onClick={() => { setVisibility(!visibility) }}>
                      <ThemeProvider theme={theme}>
                        {!visibility ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                      </ThemeProvider>
                    </StyledButtonVisibility>
                  </StyledContainerPassword>
                  {(errors.password === 'Please enter your password' &&
                    touched.password && (
                      <StyledRequired>{errors.password}</StyledRequired>
                    )) ||
                    (errors.password &&
                      errors.password.includes(
                        'password must match the following'
                      ) &&
                      touched.password && (
                        <StyledError>
                          This password should contain at least eight characters
                          and at least one number and one letter
                        </StyledError>
                      )) ||
                    (errors.password && touched.password && (
                      <StyledError>{errors.password}</StyledError>
                    )) ||
                    (noUser && (
                      <StyledError>Email or password is uncorrect</StyledError>
                    )) || (touched.password &&
                      <StyledCorrect>This is an CORRECT password</StyledCorrect>)}
                </StyledFormDiv>
                <StyledButton type="submit">
                  Log In
                  <SVG.LoginWhiteIcon />
                </StyledButton>
              </StyledForm>
            );
          }
        }}
      </Formik>
    </StyledContainer>
  );
};

export default LoginForm;
