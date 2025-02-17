import * as z from 'zod';

export const signupFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
    address: z.string().min(5, {
      message: 'Address must be at least 5 characters.',
    }),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Please enter a valid phone number.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
