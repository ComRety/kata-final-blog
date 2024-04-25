import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Form, useNavigate, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { articleCreate, articlesAdd, updateArticle } from '../../store/articlesAddGet';

import classes from './newArticle.module.css';

export default function EditArticlePost() {
  const article = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tag, setTag] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  useEffect(() => {
    if (article) {
      if (article.article.tagList.length > 0) {
        article.article.tagList.forEach((i) => {
          append(i);
        });
      }
    }
  }, []);

  const addTag = () => {
    if (tag.trim() && tag.trim().length < 15) {
      append(tag.trim());
      setTag('');
      clearErrors('tagInput');
    }
    if (!tag.trim()) {
      setError('tagInput', {
        type: 'form',
        message: 'Поле не должно быть пустым',
      });
      setTag('');
    }
    if (tag.trim().length >= 15) {
      setError('tagInput', {
        type: 'form',
        message: 'Тег не должен привышать 15 символов',
      });
      setTag('');
    }
  };

  const removeTag = (index) => () => {
    remove(index);
  };

  const onChangeTag = (event) => {
    setTag(event.target.value);
  };

  const onSubmit = async (data) => {
    const obj = {
      article: {
        title: data.Title,
        description: data.Description,
        body: data.Text,
        tagList: data.tags,
      },
    };
    if (article) {
      const req = await dispatch(updateArticle({ obj, slug: article.article.slug }));
      if (req.meta.requestStatus === 'fulfilled') {
        dispatch(articlesAdd(1));
        return navigate('/');
      }
    } else {
      const req = await dispatch(articleCreate(obj));
      if (req.meta.requestStatus === 'fulfilled') {
        dispatch(articlesAdd(1));
        return navigate('/');
      }
    }
    return null;
  };

  return (
    <div className={classes.block}>
      <h2 className={classes.title}>Edit article</h2>
      <Form className={classes.form} method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Title" className={classes.label}>
          Title
          <input
            className={errors.Username ? `${classes.input} ${classes.inputError}` : classes.input}
            type="text"
            id="Title"
            placeholder="Title"
            defaultValue={article ? article.article.title : null}
            {...register('Title', {
              required: 'Поле обязательно к заполнению',
            })}
          />
        </label>
        <div className={classes.error}>{errors?.Title && (errors?.Title?.message || 'Errors')}</div>
        <label htmlFor="Short description" className={classes.label}>
          Short description
          <input
            className={errors.Email ? `${classes.input} ${classes.inputError}` : classes.input}
            type="text"
            defaultValue={article ? article.article.description : null}
            id="Short description"
            {...register('Description', {
              required: 'Поле обязательно к заполнению',
            })}
            placeholder="Title"
          />
        </label>
        <div className={classes.error}>{errors?.Description && (errors?.Description?.message || 'Errors')}</div>
        <label htmlFor="Text" className={classes.label}>
          Text
          <textarea
            className={
              errors.Password ? `${classes.input} ${classes.inputError}` : `${classes.input} ${classes.textInput}`
            }
            type="text"
            defaultValue={article ? article.article.body : null}
            placeholder="Text"
            id="Text"
            {...register('Text', {
              required: 'Поле обязательно к заполнению',
            })}
          />
        </label>
        <div className={classes.error}>{errors?.Text && (errors?.Text?.message || 'Error')}</div>
        <label htmlFor="tagsBlock" className={classes.label}>
          Tags
          <div id="tagsBlock" className={classes.tagsBlock}>
            {fields.map((item, index) => (
              <div key={item.id} className={classes.tag}>
                <Controller
                  render={({ field: { value } }) => (
                    <input value={value} disabled className={`${classes.input} ${classes.inputTag}`} />
                  )}
                  name={`tags[${index}]`}
                  control={control}
                />
                <button type="button" className={classes.buttonRemoveTag} onClick={removeTag(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </label>
        <div className={classes.blockForInputTag}>
          <div>
            <input
              className={
                errors.tagInput
                  ? `${classes.input} ${classes.inputTag} ${classes.inputError}`
                  : `${classes.input} ${classes.inputTag}`
              }
              placeholder="Enter tag..."
              name="tagInput"
              value={tag}
              onChange={onChangeTag}
            />
            <div className={classes.error}>{errors?.tagInput && (errors?.tagInput?.message || 'Errors')}</div>
          </div>
          <button type="button" className={classes.buttonAddTag} onClick={addTag}>
            Add Tag
          </button>
        </div>
        <input
          disabled={!isValid}
          type="submit"
          value="Send"
          className={isValid ? classes.button : `${classes.buttonN} ${classes.button}`}
        />
      </Form>
    </div>
  );
}

export const editArticle = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`https://blog.kata.academy/api/articles/${id}`);
  return res.json();
};
