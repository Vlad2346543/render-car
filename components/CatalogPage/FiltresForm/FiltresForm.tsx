'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Select from 'react-select';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllFilters } from '@/lib/api/clientApi';
import { useId } from 'react';
import * as Yup from 'yup';
import Loader from '@/components/shared/Loader/Loader';
import css from './FiltresForm.module.css';

interface FiltersFormProps {
  onSubmitFilters: (values: {
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
  }) => void;
}

interface FiltersFormValues {
  brand: string;
  price: number | '';
  minMileage: number | '';
  maxMileage: number | '';
}
interface OptionType {
  value: string | number;
  label: string;
}
const emptyValues: FiltersFormValues = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};
const FiltersSchema = Yup.object().shape({
  brand: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').notRequired(),
  price: Yup.number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .typeError('Price must be a number')
    .notRequired(),
  minMileage: Yup.number()
    .integer()
    .notRequired()
    .typeError('From must be a number')
    .min(0, 'Minimum value is 0'),
  maxMileage: Yup.number()
    .integer()
    .notRequired()
    .typeError('To must be a number')
    .min(0, 'Mileage must be more than 0')
    .max(1000000, 'Maximum value is 1000000'),
});
export default function FiltersForm({ onSubmitFilters }: FiltersFormProps) {
  const fieldId = useId();

  const { data, isLoading } = useQuery({
    queryKey: ['filters'],
    queryFn: () => getAllFilters(),
    placeholderData: keepPreviousData,
  });
  const brandOptions =
    data?.brands?.map(brand => ({
      value: brand,
      label: brand,
    })) ?? [];

  const handleChangeOptions = (min: number, max: number) => {
    const options = [];
    for (let i = min; i <= max; i += 10) {
      options.push({
        value: i,
        label: `${i}`,
      });
    }
    return options;
  };

  const priceOptions = handleChangeOptions(
    data?.price.min as number,
    data?.price.max as number
  );

  const handleSubmit = async (
    values: FiltersFormValues,
    actions: FormikHelpers<FiltersFormValues>
  ) => {
    onSubmitFilters({
      brand: values.brand || undefined,
      price: values.price || undefined,
      minMileage: values.minMileage || undefined,
      maxMileage: values.maxMileage || undefined,
    });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  if (isLoading) return <Loader />;

  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={emptyValues}
        onSubmit={handleSubmit}
        validationSchema={FiltersSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.wrapper}>
              <label htmlFor={`${fieldId}-brand`} className={css.label}>
                Car brand
              </label>
              <Select<OptionType>
                value={
                  brandOptions.find(option => option.value === values.brand) ||
                  null
                }
                onChange={option => {
                  setFieldValue('brand', option?.value || '');
                }}
                options={brandOptions}
                placeholder="Choose a brand"
                name="brand"
                inputId={`${fieldId}-brand`}
                styles={{
                  control: base => ({
                    ...base,
                    width: '204px',
                    height: '44px',
                    backgroundColor: '#f7f7f7',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0 8px',
                    boxShadow: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      border: 'none',
                    },
                  }),
                  placeholder: base => ({
                    ...base,
                    color: '#101828',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: 1.25,
                  }),
                  valueContainer: base => ({
                    ...base,
                    padding: 0,
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    color: '#101828',
                    transition: 'transform 0.2s ease',
                    transform: state.selectProps.menuIsOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                    '&:hover': {
                      color: '#101828',
                    },
                  }),
                  menu: base => ({
                    ...base,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 36px rgba(0,0,0,0.08)',
                    padding: '8px 0',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#f7f7f7' : '#fff',
                    color: '#8d929a',
                    cursor: 'pointer',
                    padding: '12px 16px',
                    '&:hover': {
                      color: '#101828',
                    },
                  }),
                  singleValue: base => ({
                    ...base,
                    color: '#101828',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: 1.25,
                  }),
                }}
              />
            </div>
            <div className={css.wrapper}>
              <label htmlFor={`${fieldId}-price`} className={css.label}>
                Price/ 1 hour
              </label>
              <Select<OptionType>
                value={
                  priceOptions.find(option => option.value === values.price) ||
                  null
                }
                formatOptionLabel={(option, { context }) => {
                  if (context === 'value') {
                    return `To $${option.value}`;
                  }

                  return option.label;
                }}
                onChange={option => {
                  setFieldValue('price', option?.value || '');
                }}
                options={priceOptions}
                placeholder="Choose a price"
                name="rentalPrice"
                inputId={`${fieldId}-price`}
                styles={{
                  control: base => ({
                    ...base,
                    width: '196px',
                    height: '44px',
                    backgroundColor: '#f7f7f7',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0 8px',
                    boxShadow: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      border: 'none',
                    },
                  }),
                  placeholder: base => ({
                    ...base,
                    color: '#101828',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: 1.25,
                  }),
                  valueContainer: base => ({
                    ...base,
                    padding: 0,
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    color: '#101828',
                    transition: 'transform 0.2s ease',
                    transform: state.selectProps.menuIsOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                    '&:hover': {
                      color: '#101828',
                    },
                  }),
                  menu: base => ({
                    ...base,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 36px rgba(0,0,0,0.08)',
                    padding: '8px 0',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#f7f7f7' : '#fff',
                    color: '#8d929a',
                    cursor: 'pointer',
                    padding: '12px 16px',
                    '&:hover': {
                      color: '#101828',
                    },
                  }),
                  singleValue: base => ({
                    ...base,
                    color: '#101828',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: 1.25,
                  }),
                }}
              />
            </div>
            <div className={css.wrapper}>
              <label htmlFor={`${fieldId}-mileage`} className={css.label}>
                Сar mileage / km
              </label>
              <div className={css.wrappersContainer}>
                <div className={css.inputWrapper}>
                  <span className={css.customLabel}>From</span>
                  <Field
                    type="number"
                    name="minMileage"
                    className={css.input}
                    id={`${fieldId}-mileage`}
                  />
                  <ErrorMessage
                    name="minMileage"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.inputWrapper}>
                  <span className={css.customLabel}>To</span>
                  <Field
                    type="number"
                    name="maxMileage"
                    className={css.input}
                  />
                  <ErrorMessage
                    name="maxMileage"
                    component="span"
                    className={css.error}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className={css.searchBtn}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}