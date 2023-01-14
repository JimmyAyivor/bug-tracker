import React, { useState } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useScriptRef from "../../../hooks/useScriptRef";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from 'yup';

const FirebaseRegister = ({ className, ...rest }) => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
const [error, setError] = useState(false)
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const auth = getAuth();
    try{
      const res = createUserWithEmailAndPassword(auth, email, password)
      navigate('/',{replace:true});

    }catch (error){
    setError(true)
  };
}

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: "bugdemo@gmail.com",
          password: "123456",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await signInWithEmailAndPassword(values.email, values.password);

            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(true);
              alert("you are logged in - redirecting");
              navigate('/',{replace:true});
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            className={className}
            {...rest}
          >
            <div className='form-group mb-3'>
              <input
                className='form-control'
                error={touched.email && errors.email}
                label='Email Address / Username'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                type='email'
                value={values.email}
              />
              {touched.email && errors.email && (
                <small class='text-danger form-text'>{errors.email}</small>
              )}
            </div>
            <div className='form-group mb-4'>
              <input
                className='form-control'
                error={touched.password && errors.password}
                label='Password'
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                type='password'
                value={values.password}
              />
              {touched.password && errors.password && (
                <small class='text-danger form-text'>{errors.password}</small>
              )}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant='danger'>{errors.submit}</Alert>
              </Col>
            )}

            <div className='custom-control custom-checkbox  text-left mb-4 mt-2'>
              <input
                type='checkbox'
                className='custom-control-input'
                id='customCheck1'
              />
              <label className='custom-control-label' htmlFor='customCheck1'>
                Save credentials.
              </label>
            </div>

            <Row>
              <Col mt={2}>
                <Button
                  className='btn-block'
                  color='primary'
                  disabled={isSubmitting}
                  size='large'
                  type='submit'
                  variant='primary'
                >
                  Signin
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
      <h3 className='mb-4'>Sign up</h3>
      <form onSubmit={handleSubmit}>
      <div className='input-group mb-3'>
        <input type='text' className='form-control' placeholder='Username' />
      </div>
      <div className='input-group mb-3'>
        <input
          type='email'
          className='form-control'
          placeholder='Email address'
        />
      </div>
      <div className='input-group mb-4'>
        <input
          type='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <div className='custom-control custom-checkbox  text-left mb-4 mt-2'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customCheck1'
          defaultChecked={false}
        />
        <label className='custom-control-label' htmlFor='customCheck1'>
          Send me the <Link to='#'> Newsletter</Link> weekly.
        </label>
      </div>
      <button className='btn btn-primary mb-4'>Sign up</button>
      {error && <span>Something went wrong!</span>}
      </form>
      <Row>
        <Col sm={12}>
          <h5 className='my-3'> OR </h5>
        </Col>
      </Row>

      <hr />
    </React.Fragment>
  );
};

export default FirebaseRegister;
