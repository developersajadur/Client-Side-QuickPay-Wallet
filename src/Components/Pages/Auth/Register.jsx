import { useForm } from 'react-hook-form';
import { Label, TextInput, Button, Card, Alert } from 'flowbite-react';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
              maxLength: { value: 5, message: 'PIN must be 5 digits' },
            })}
          />
          {errors.pin && <Alert color="red">{errors.pin.message}</Alert>}
        </div>
        <Button className='bg-blue-500 w-full' type="submit">Register</Button>
      </form>
    </Card>
  </div>
  );
};

export default Register;
