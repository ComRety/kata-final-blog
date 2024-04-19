import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { updateLogin } from '../../store/signUp';

import classes from './fixUser.module.css';

export default function FixUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((store) => store.signUp.username);
  const userEmail = useSelector((store) => store.signUp.email);

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
        username: data.Username,
        email: data.Email,
        password: data.Password,
        image: data.Avatar ? data.Avatar : null,
        bio: data.Bio ? data.Avatar : null,
      },
    };
    const req = await dispatch(updateLogin(obj));
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
            defaultValue={userName}
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
            defaultValue={userEmail}
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
          New password
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
        <label htmlFor="Avatar" className={classes.label}>
          Avatar image (url)
          <input
            className={errors.Repeat ? `${classes.input} ${classes.inputError}` : classes.input}
            type="text"
            placeholder="Avatar image"
            id="Avatar"
            {...register('Avatar', {
              required: false,
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi,
                message: 'Incorrect url',
              },
            })}
          />
        </label>
        <div className={classes.error}>{errors?.Avatar && (errors?.Avatar?.message || 'Error')}</div>
        <label htmlFor="Bio" className={classes.label}>
          Bio
          <input
            className={errors.Repeat ? `${classes.input} ${classes.inputError}` : classes.input}
            type="text"
            placeholder="Bio text"
            id="Bio"
            {...register('Bio', {
              required: false,
            })}
          />
        </label>
        <div className={classes.error}>{errors?.Bio && (errors?.Bio?.message || 'Error')}</div>
        <input
          disabled={!isValid}
          type="submit"
          value="Save"
          className={isValid ? classes.button : `${classes.buttonN} ${classes.button}`}
        />
      </Form>
    </div>
  );
}
