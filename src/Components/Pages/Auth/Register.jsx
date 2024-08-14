// src/pages/Register.js
import { useForm } from 'react-hook-form';
import { Label, TextInput, Button, Card, Alert, Select } from 'flowbite-react'; // Import Select from Flowbite
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../Hooks/useAuth';

const api = import.meta.env.VITE_API_URL;

const Register = () => {
  const { login } = useAuth(); // Use login function from context
  const navigate = useNavigate(); 

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Post request to the backend with the registration data
      const response = await axios.post(`${api}/register`, {
        ...data,
        status: 'pending', // Set status to pending
        balance: 0, // Set default balance to 0
      });

      // Extract token from response
      const token = response.data.token;

      if (token) {
        login(token); // Update context and local storage with the token
        toast.success('Successfully registered!');
        navigate('/'); // Navigate to home page on successful registration
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
            <Label htmlFor="role" value="Account Type" />
            <Select
              id="role"
              {...register('role', { required: 'Account type is required' })}
              placeholder="Select account type"
            >
              <option disabled selected value="null">Select</option>
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </Select>
            {errors.role && <Alert color="red">{errors.role.message}</Alert>}
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
        <div className="text-center mt-4">
          <p className='text-blue-500'>Already Have An Account? <Link className='font-semibold' to='/login'>Click Here</Link></p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
