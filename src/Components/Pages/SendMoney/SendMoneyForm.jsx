import { useForm } from 'react-hook-form';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useUser from '../../Hooks/useUser';
import toast from 'react-hot-toast';

const SendMoneyForm = ({ onClose }) => { // Accept onClose prop
  const axiosSecure = useAxiosSecure();
  const { user } = useUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Include reset function

  const onSubmit = async (data) => {
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

      if (response.status === 200) {
        toast.success('Transaction Successful');
        reset(); // Reset form fields
        onClose(); // Close the modal
      }
    } catch (error) {
      toast.error(`${error.response ? error.response.data : error.message}`);
      console.error('Transaction Failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <Label htmlFor="receiverNumber" value="Receiver Number" className="mb-2 block" />
        <TextInput
          id="receiverNumber"
          type="number"
          placeholder="Enter Receiver Number"
          color={errors.receiverNumber ? 'failure' : 'default'}
          {...register('receiverNumber', { required: 'Receiver Number is required' })}
        />
        {errors.receiverNumber && <Alert color="failure" className="mt-2 py-1">{errors.receiverNumber.message}</Alert>}
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
