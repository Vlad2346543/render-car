'use client';
import { useId } from 'react';
import css from './BookingForm.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Order } from '@/app/types/order';

interface BookingFormProps {
  onSubmit: (order: Order) => void;
  isPending?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  comment: string;
}
const initialValues: FormValues = {
  name: '',
  email: '',
  comment: '',
};
const bookingValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Name should be at least 3 symbols')
    .max(100, 'Name should be maximum 100 symbols')
    .required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .trim()
    .min(3, 'Email should be at least 3 symbols')
    .max(100, 'Email should be maximum 100 symbols')
    .required('Please enter your email'),
  comment: Yup.string()
    .trim()
    .min(3, 'Comment should be at least 3 symbols')
    .max(1000, 'Too much symbols'),
});

export default function BookingForm({ isPending, onSubmit }: BookingFormProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const order: Order = {
      name: values.name,
      email: values.email,
      comment: values.comment,
    };

    onSubmit(order);

    actions.resetForm();
    actions.setSubmitting(false);
  };
  return (
    <div className={css.formWrapper}>
      <h4 className={css.formTitle}>Book your car now</h4>
      <p className={css.formSup}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={bookingValidationSchema}
      >
        <Form className={css.form} >
          <Field
            type="text"
            name="name"
            id={`${fieldId}-name`}
            className={css.input}
            placeholder="Name*"
          />
          <ErrorMessage name="name" component="p" className={css.error} />
          <Field
            type="email"
            name="email"
            id={`${fieldId}-email`}
            className={css.input}
            placeholder="Email*"
          />
          <ErrorMessage name="email" component="p" className={css.error} />
          <Field
            as="textarea"
            type="text"
            name="comment"
            id={`${fieldId}-comment`}
            className={css.textarea}
            placeholder="Comment"
          />
          <ErrorMessage name="comment" component="p" className={css.error} />
          <button type="submit" className={css.sendBtn} disabled={isPending}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
}