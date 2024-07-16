import React from 'react';
import { useForm } from 'react-hook-form';
import { Label, TextInput, Button, Card, Alert } from 'flowbite-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
