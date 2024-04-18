import { useForm } from 'react-hook-form';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signUpPost } from '../../store/signUp';

import classes from './newAccount.module.css';

export default function NewAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const obj = {
      user: {
        username: data.Username,
        email: data.Email,
        password: data.Password,
      },
    };
    const req = await dispatch(signUpPost(obj));
    if (req.meta.requestStatus === 'fulfilled') {
      return navigate('/');
    }
    if (req.meta.requestStatus === 'rejected') {
      const answer = JSON.parse(req.payload);
      if (answer.username) {
        setError('Username', {
          type: 'server',
          message: answer.username,
        });
      }
      if (answer.email) {
        setError('Email', {
          type: 'server',
          message: answer.email,
        });
      }
    }
    return null;
  };

  return (
    <div className={classes.block}>
      <h2 className={classes.title}>Create new account</h2>
      <Form className={classes.form} method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Username" className={classes.label}>
          Username
          <input
            className={errors.Username ? `${classes.input} ${classes.inputError}` : classes.input}
            type="text"
            id="Username"
            placeholder="Username"
            {...register('Username', {
              required: 'Поле обязательно к заполнению',
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters' },
              maxLength: {
                value: 20,
                message: 'Your username must consist of a maximum of 20 characters',
              },
            })}
          />
        </label>
        <div className={classes.error}>{errors?.Username && (errors?.Username?.message || 'Errors')}</div>
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
        <label htmlFor="Repeat Password" className={classes.label}>
          Repeat Password
          <input
            className={errors.Repeat ? `${classes.input} ${classes.inputError}` : classes.input}
            type="password"
            placeholder="Password"
            id="Repeat Password"
            {...register('Repeat', {
              required: 'Поле обязательно к заполнению',
              validate: (val) => {
                if (watch('Password') !== val) {
                  return 'Passwords must match';
                }
                return null;
              },
            })}
          />
        </label>
        <div className={classes.error}>{errors?.Repeat && (errors?.Repeat?.message || 'Error')}</div>
        <label htmlFor="check" className={classes.checkBox}>
          <input type="checkbox" className={classes.check} id="check" {...register('checkbox', { required: true })} />
          <span className={classes.checkInput} />I agree to the processing of my personal information
        </label>
        <input
          disabled={!isValid}
          type="submit"
          value="Create"
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
