import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Airdrop } from '../../types';
import { Contract } from 'ethers';

const initialValues: Airdrop = {
  addresses:
    '0x40AF7d98e9F2844833bFdaA17ad4b7396143858b,0x2F9cc0C3AE27FD8151E71E36e01Bd123EE098B04',
  amounts: '100000000000,10000000000000',
};

type Props = {
  contract: Contract | null;
  tokenAddress: string;
  account: string;
};

const AirdropForm: React.FC<Props> = ({ contract, tokenAddress, account }) => {
  const [hashPassed, setHashPassed] = useState<string>('');
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
    if (contract) {
      console.log(values.addresses);
      console.log(values.amounts);
      contract
        .airdropWithTransfer(
          tokenAddress,
          values.addresses.split(','),
          values.amounts.split(',')
        )
        .then((res: any) => {
          console.log(res);
          setHashPassed(res.hash);
        });
    }
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
              multiline
              fullWidth
              required
              style={{ width: '50%' }}
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
              multiline
              fullWidth
              required
              style={{ width: '50%' }}
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
            {hashPassed.length > 0 && `Hash: ${hashPassed}`}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AirdropForm;
