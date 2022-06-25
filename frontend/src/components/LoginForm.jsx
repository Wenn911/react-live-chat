import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks';
import { useHistory, Link } from 'react-router-dom';
import routes from '../routes';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import FormContainer from './FormContainer';

const LoginForm = () => {
    const [error, setError] = useState(null);
    const auth = useAuth();
    const history = useHistory();
    const usernameRef = useRef();
    const { t } = useTranslation();

    const redirectAuth = useCallback(
        () => {
        if (auth.loggenIn) {
            history.replace('/');
            }
        },
        [auth.loggenIn, history],
  );
  
  useEffect(() => {
    redirectAuth();
    usernameRef.current.focus();
  }, [redirectAuth]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const url = routes.login();

    setError(null);

    try {
      const res = await axios.post(url, { ...values }, { timeout: 10000, timeoutErrorMessage: 'Network Error' });

      auth.logIn(res.data);

      history.push('/');
    } catch (e) {
      if (e.isAxiosError && e.response && e.response.status === 401) {
        setError('invalidLabels');
        usernameRef.current.select();
      } else if (e.isAxiosError && e.message === 'Network Error') {
        setError('networkErr');
      } else {
        setError('unknown');
        console.error(e);
      }

      setSubmitting(false);
    }
  };

    const loginSchema = Yup.object().shape({
        username: Yup.string().trim().required('Required'),
        password: Yup.string().required('Required')
    });

    const formik = useFormik({
        initialValues: {
            username: '', 
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: handleSubmit
    })
  return (
    <FormContainer>
      <Form data-testid="login-form" className="p-3" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">{t('labels.yourNick')}</Form.Label>
          <Form.Control
            name="username"
            id="username"
            autoComplete="username"
            required
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            readOnly={formik.isSubmitting}
            ref={usernameRef}
            isInvalid={!!error}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">{t('labels.password')}</Form.Label>
          <Form.Control
            name="password"
            id="password"
            autoComplete="current-password"
            required
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            readOnly={formik.isSubmitting}
            isInvalid={!!error}
          />
          {error
            && <Form.Control.Feedback type="invalid">{t(`errors.${error}`)}</Form.Control.Feedback>}
        </Form.Group>
        <Button
          type="submit"
          variant="outline-primary"
          className="w-100 mb-3"
          disabled={formik.isSubmitting}
        >
          {t('buttons.logIn')}
        </Button>
        <div className="text-center">
          <span>
            {t('texts.noAccount')}
            &nbsp;
            <Link to="/signup">{t('texts.registration')}</Link>
          </span>
        </div>
      </Form>
    </FormContainer>
  )
}

export default LoginForm