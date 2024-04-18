import { useForm } from 'react-hook-form';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signLogin } from '../../store/signUp';

import classes from './login.module.css';

export default function LoginAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const obj = {
      user: {
        email: data.Email,
        password: data.Password,
      },
    };
    const req = await dispatch(signLogin(obj));
    if (req.meta.requestStatus === 'fulfilled') {
      return navigate('/');
    }
    if (req.meta.requestStatus === 'rejected') {
      const answer = JSON.parse(req.payload);
      if (answer['email or password']) {
        setError('Password', {
          type: 'server',
          message:
            answer['email or password'] === 'is invalid'
              ? 'The password or email is incorrect'
              : answer['email or password'],
        });
        setError('Email', {
          type: 'server',
          message:
            answer['email or password'] === 'is invalid'
              ? 'The password or email is incorrect'
              : answer['email or password'],
        });
      }
    }
    return null;
  };

  return (
    <div className={classes.block}>
      <h2 className={classes.title}>Sign In</h2>
      <Form className={classes.form} method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Email address" className={classes.label}>
          Email address
          <input
            className={errors.Email ? `${classes.input} ${classes.inputError}` : classes.input}
            type="email"
            {...register('Email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
            placeholder="Email address"
            id="Email address"
          />
        </label>
        <div className={classes.error}>{errors?.Email && (errors?.Email?.message || 'Errors')}</div>
        <label htmlFor="Password" className={classes.label}>
          Password
          <input
            className={errors.Password ? `${classes.input} ${classes.inputError}` : classes.input}
            type="password"
            placeholder="Password"
            id="Password"
            {...register('Password', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
              message: {
                value: 40,
                message: 'Your password must consist of a maximum of 40 characters',
              },
            })}
          />
        </label>
        <div className={classes.error}>{errors?.Password && (errors?.Password?.message || 'Error')}</div>
        <input
          disabled={!isValid}
          type="submit"
          value="Login"
          className={isValid ? classes.button : `${classes.buttonN} ${classes.button}`}
        />
      </Form>
      <div className={classes.blockLink}>
        <span className={classes.linkSpan}>Already have an account?</span>
        <Link to="/sign-in" className={classes.link}>
          Sign in.
        </Link>
      </div>
    </div>
  );
}
