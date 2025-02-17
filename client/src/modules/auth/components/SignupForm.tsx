import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Link, useNavigate} from 'react-router';
import {signupFormSchema} from '../schemas/signup.schema';
import {useCreateUserMutation} from '@/core/store/api/userApi';
import {Loader2} from 'lucide-react';

export default function SignupForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phoneNumber: '',
    },
  });

  const [createUser, {isLoading}] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    const {email, password, firstName, lastName, phoneNumber, address} = values;

    try {
      await createUser({
        email,
        password,
        firstName,
        lastName,
        phone: phoneNumber,
        address,
      });

      toast.success('Your account has been created successfully');
      navigate('/signin');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user account');
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter the required details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                      <FormItem className="flex-1">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St, City, Country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({field}) => (
                      <FormItem className="flex-1">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link to={'/signin'} className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
