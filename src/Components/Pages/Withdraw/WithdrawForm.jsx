// WithdrawForm.js
import React from 'react';
import { useForm } from 'react-hook-form';

const WithdrawForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          {...register('amount', { required: 'Amount is required', min: { value: 50, message: 'Minimum amount is 50' } })}
        />
        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
      </div>
      <div>
        <label htmlFor="pin">PIN</label>
        <input
          id="pin"
          type="password"
          {...register('pin', { required: 'PIN is required' })}
        />
        {errors.pin && <p className="text-red-500">{errors.pin.message}</p>}
      </div>
      <button type="submit" className="mt-4 btn btn-primary">Withdraw</button>
    </form>
  );
};

export default WithdrawForm;
