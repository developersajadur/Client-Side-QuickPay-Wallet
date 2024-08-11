import { useForm } from 'react-hook-form';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useUser from '../../Hooks/useUser';

const AddMoneyForm = ({ onClose }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post('/cashInRequest', {
        userId: user.id,
        agentNumber: data.agentNumber,
        amount: data.amount,
      }, {
        headers: {
          email: user.email,
        }
      });

      if (response.status === 200) {
        toast.success('Cash-in Request Sent Successfully');
        reset();
        onClose();
      }
    } catch (error) {
      toast.error(`${error.response ? error.response.data : error.message}`);
      console.error('Cash-in Request Failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <Label htmlFor="agentNumber" value="Agent Number" className="mb-2 block" />
        <TextInput
          id="agentNumber"
          type="number"
          placeholder="Enter Agent Number"
          color={errors.agentNumber ? 'failure' : 'default'}
          {...register('agentNumber', { required: 'Agent Number is required' })}
        />
        {errors.agentNumber && <Alert color="failure" className="mt-2 py-1">{errors.agentNumber.message}</Alert>}
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

      <Button type="submit" className="w-full bg-blue-500">
        Request Cash-in
      </Button>
    </form>
  );
};

export default AddMoneyForm;
