import { useForm } from 'react-hook-form';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useUser from '../../Hooks/useUser';
import toast from 'react-hot-toast';

const WithdrawForm = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {    
    console.log(data);
    
    try {
      const response = await axiosSecure.post('/withdrawMoney', {
        senderId: user.id,
        agentNumber: data.agentNumber,
        amount: data.amount,
        pin: data.pin,
      }, {
        headers: {
          email: user?.email, 
        }
      });
      if(response.status === 200) {
        toast.success('Withdraw Successful')
      }
    } catch (error) {
      toast.error(`${error.response ? error.response.data : error.message}`);
      console.error('Withdraw Failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4 text-center">Withdraw Money</h2> */}
      
      <div className="mb-4">
        <Label htmlFor="agentNumber" value=" Agent Number" className="mb-2 block" />
        <TextInput
          id="agentNumber"
          type="number"
          placeholder="Enter Agent Number"
          min={0}
          color={errors.amount ? 'failure' : 'default'}
          {...register('agentNumber', { required: 'Agent Number is required'})}
        />
        {errors.amount && <Alert color="failure" className="mt-2">{errors.amount.message}</Alert>}
      </div>
      <div className="mb-4">
        <Label htmlFor="amount" value="Amount" className="mb-2 block" />
        <TextInput
          id="amount"
          type="number"
          placeholder="Enter amount"
          min={0}
          color={errors.amount ? 'failure' : 'default'}
          {...register('amount', { required: 'Amount is required', min: { value: 50, message: 'Minimum amount is 50' } })}
        />
        {errors.amount && <Alert color="failure" className="mt-2">{errors.amount.message}</Alert>}
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
        {errors.pin && <Alert color="failure" className="mt-2">{errors.pin.message}</Alert>}
      </div>

      <Button type="submit" className="w-full bg-blue-500">
        Withdraw
      </Button>
    </form>
  );
};

export default WithdrawForm;
