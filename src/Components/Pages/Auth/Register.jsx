import { useForm } from 'react-hook-form';
import { Label, TextInput, Button, Card, Alert } from 'flowbite-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const api = import.meta.env.VITE_API_URL;

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Initialize the navigate hook

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.get("/users" || []);
      const emailExists = res.data.some(user => user.email === data.email);
      const mobileNumberExists = res.data.some(user => user.mobileNumber === data.mobileNumber);

      if (emailExists) {
        toast.error("Email already exists");
        return;
      }
      
      if (mobileNumberExists) {
        toast.error("Mobile Number already exists");
        return;
      }

      // Proceed with user registration
      const dataToSend = {
        name: data.name,
        email: data.email,
        mobileNumber: data.mobileNumber,
        pin: data.pin,
        balance: 0,
        status: 'pending',
        role: 'user',
      }

      const response = await axios.post(`${api}/users`, dataToSend);
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the token
        toast.success('Successfully registered!');
        navigate('/'); 
      } else {
        toast.error('Error registering user. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-96 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <Alert color="red">{errors.name.message}</Alert>}
          </div>
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
            <Label htmlFor="mobileNumber" value="Mobile Number" />
            <TextInput
              id="mobileNumber"
              type="text"
              placeholder="Enter your mobile number"
              {...register('mobileNumber', { required: 'Mobile number is required' })}
            />
            {errors.mobileNumber && <Alert color="red">{errors.mobileNumber.message}</Alert>}
          </div>
          <div>
            <Label htmlFor="pin" value="5-digit PIN" />
            <TextInput
              id="pin"
              type="password"
              placeholder="Enter a 5-digit PIN"
              {...register('pin', { 
                required: 'PIN is required', 
                minLength: { value: 5, message: 'PIN must be 5 digits' },
                maxLength: { value: 5, message: 'PIN must be 5 digits' }
              })}
            />
            {errors.pin && <Alert color="red">{errors.pin.message}</Alert>}
          </div>
          <Button className="bg-blue-500 w-full" type="submit">Register</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
