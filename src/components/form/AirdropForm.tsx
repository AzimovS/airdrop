import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Airdrop } from '../../types';

const initialValues: Airdrop = {
  addresses: '',
  amounts: '',
};

const AirdropForm: React.FC = () => {
  const [addresses, setAddresses] = useState<string>('');
  const [amountArray, setAmountArray] = useState<string>('');

  const validate = (values: Airdrop) => {
    const errors: Partial<Airdrop> = {};
    if (!values.addresses) {
      errors.addresses = 'Required';
    } else if (!values.amounts) {
      errors.amounts = 'Required';
    } else if (
      values.addresses.split(',').length !== values.amounts.split(',').length
    ) {
      errors.addresses = 'The length is different from amounts';
      errors.amounts = 'The length is different from addresses';
    }
    return errors;
  };

  const handleSubmit = (values: Airdrop) => {
    console.log(values);
  };

  return (
    <Formik<Airdrop>
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit} noValidate>
          <Box
            mt={2}
            display='flex'
            gap={'20px'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            {}
            <TextField
              label='Addresses'
              name='addresses'
              type='string'
              value={values.addresses}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['addresses']}
              helperText={!!errors['addresses'] && errors['addresses']}
              required
            />
            <TextField
              label='Amounts'
              name='amounts'
              type='string'
              value={values.amounts}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors['amounts']}
              helperText={!!errors['amounts'] && errors['amounts']}
              required
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AirdropForm;
