import { useForm } from 'react-hook-form';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useUser from '../../Hooks/useUser';

const SendMoneyForm = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const response = await axiosSecure.post('/sendMoney', {
        senderId: user.id,
        receiverNumber: data.receiverNumber,
        amount: data.amount,
        pin: data.pin,
      }, {
        headers: {
          email: user.email, 
        }
      });
  
      console.log('Transaction Successful:', response.data);
    } catch (error) {
      console.error('Transaction Failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4 text-center">Send Money</h2> */}

      <div className="mb-4">
        <Label htmlFor="Receiver Number" value="Receiver Number" className="mb-2 block" />
        <TextInput
          id="recipient"
          type="number"
          placeholder="Enter Receiver Number"
          color={errors.recipient ? 'failure' : 'default'}
          {...register('receiverNumber', { required: 'Recipient is required' })}
        />
        {errors.recipient && <Alert color="failure" className="mt-2 py-1">{errors.recipient.message}</Alert>}
      </div>

      <div className="mb-4">
        <Label htmlFor="amount" value="Amount" className="mb-2 block" />
        <TextInput
          id="amount"
          min={0}
          type="number"
          placeholder="Enter amount"
          color={errors.amount ? 'failure' : 'default'}
          {...register('amount', { required: 'Amount is required', min: { value: 50, message: 'Minimum amount is 50' } })}
        />
        {errors.amount && <Alert color="failure" className="mt-2 py-1">{errors.amount.message}</Alert>}
      </div>

      <div className="mb-4">
        <Label htmlFor="pin" value="PIN" className="mb-2 block" />
        <TextInput
          id="pin"
          type="password"
          placeholder="Enter PIN"
          color={errors.pin ? 'failure' : 'default'}
          {...register('pin', { required: 'PIN is required' })}
        />
        {errors.pin && <Alert color="failure" className="mt-2 py-1">{errors.pin.message}</Alert>}
      </div>

      <Button type="submit" className="w-full bg-blue-500">
        Send
      </Button>
    </form>
  );
};

export default SendMoneyForm;
