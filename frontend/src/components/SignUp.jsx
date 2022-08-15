import axios from 'axios';
import { useFormik } from 'formik';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Button, Form, FormGroup, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';
import routes from '../routes';
import FormContainer from './FormContainer';
import * as yup from "yup";

function SignUp() {
  const [signUpError, setSignUpError] = useState(null);
  const auth = useAuth();
  const { t } = useTranslation();
  const usernameRef = useRef();
  const history = useHistory();

  const signUpSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .min(3, 'errors.notInRange')
        .max(20, 'errors.notInRange'),
    password: yup.string()
        .min(6, 'errors.passwordTooShort'),
    confirmPassword: yup.string()
        .oneOf([
          yup.ref('password'),
        ], 'errors.passwordsDontMatch'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: () => {
      setSignUpError(null);

      return signUpSchema;
    },
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      setSubmitting(true);

      const url = routes.signup();

      try {
        const res = await axios.post(url, { username, password }, { timeout: 10000, timeoutErrorMessage: 'Network Error' });
        auth.logIn(res.data);

        history.push('/');
      } catch (e) {
        if (e.isAxiosError && e.response && e.response.status === 409) {
          setSignUpError('userExists');
          usernameRef.current.select();
        } else if (e.isAxiosError && e.message === 'Network Error') {
          setSignUpError('networkError');
        } else {
          setSignUpError('unknown');
        }
        setSubmitting(false);
      }
    },
  });

  const redirectAuth = useCallback(
    () => {
      if (auth.loggedIn) {
        history.replace('/');
      }
    },
    [auth.loggedIn, history],
  );

  useEffect(() => {
    redirectAuth();

    usernameRef.current.focus();
  }, [redirectAuth]);

  return (
    <FormContainer>
      <Form className="p-3" onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Form.Label htmlFor="username">{t('labels.username')}</Form.Label>
          <Form.Control
            name="username"
            id="username"
            autoComplete="username"
            required
            placeholder={t('placeholder.range')}
            onChange={formik.handleChange}
            value={formik.values.username}
            isInvalid={formik.errors.username || signUpError}
            readOnly={formik.isSubmitting}
            ref={usernameRef}
          />
          {formik.errors.username
                    && <Form.Control.Feedback type="invalid">{t(formik.errors.username)}</Form.Control.Feedback>}
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="password">{t('labels.password')}</Form.Label>
          <Form.Control
            name="password"
            id="password"
            autoComplete="new-password"
            type="password"
            required
            placeholder={t('placeholder.noShorterThan')}
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={formik.errors.password || signUpError}
            readOnly={formik.isSubmitting}
          />
          {formik.errors.password
                    && <Form.Control.Feedback type="invalid">{t(formik.errors.password)}</Form.Control.Feedback>}
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="confirmPassword">{t('labels.confirmPassword')}</Form.Label>
          <Form.Control
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="new-password"
            type="password"
            required
            placeholder={t('placeholder.passwordMustMatch')}
            className="mb-3"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            isInvalid={formik.errors.confirmPassword || signUpError}
            readOnly={formik.isSubmitting}
          />
          {formik.errors.confirmPassword
                    && <Form.Control.Feedback type="invalid">{t(formik.errors.confirmPassword)}</Form.Control.Feedback>}
          {signUpError
                    && <Form.Control.Feedback type="invalid">{t(`errors.${signUpError}`)}</Form.Control.Feedback>}
        </FormGroup>
        <Button
          type="submit"
          className="w-100 mt-3"
          variant="outline-primary"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting && <Spinner className="mr-1" animation="border" size="sm" />}
          {t('buttons.signUp')}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default SignUp;
