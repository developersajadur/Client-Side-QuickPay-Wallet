// SendMoneyForm.js
import React from 'react';
import { useForm } from 'react-hook-form';

const SendMoneyForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="recipient">Recipient</label>
        <input
          id="recipient"
          type="text"
          {...register('recipient', { required: 'Recipient is required' })}
        />
        {errors.recipient && <p className="text-red-500">{errors.recipient.message}</p>}
      </div>
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
      <button type="submit" className="mt-4 btn btn-primary">Send</button>
    </form>
  );
};

export default SendMoneyForm;
