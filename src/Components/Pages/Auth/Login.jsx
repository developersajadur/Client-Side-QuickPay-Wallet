import { useForm } from 'react-hook-form';
import { Label, TextInput, Button, Card, Alert } from 'flowbite-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const api = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate



  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${api}/login`, data);
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token); // Store the token
       if(localStorage.getItem('token') === token) {
        toast.success('Successfully logged in!');
        navigate('/'); 
       }
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-96 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <Alert color="red">{errors.email.message}</Alert>}
          </div>
          <div>
            <Label htmlFor="pin" value="PIN" />
            <TextInput
              id="pin"
              // type="number"
              type="password"
              placeholder="Enter your PIN"
              {...register('pin', { required: 'PIN is required' })}
            />
            {errors.pin && <Alert color="red">{errors.pin.message}</Alert>}
          </div>
          <Button className='bg-blue-500 w-full' type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
