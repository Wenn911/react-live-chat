import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const loginSchema = Yup.object().shape({
        username: Yup.string().trim().required('Required'),
        password: Yup.string().required('Required')
    })
  return (
    <div>
        <h1>Войти</h1>
        <Formik initialValues={{ username: '', password: ''}}
        validationSchema={loginSchema}>
            <Form>
                <Field name='username' type='text'/>
                <Field name='password' type='password'/>
                <button type='submit'>Войти</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Login