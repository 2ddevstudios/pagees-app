import { z } from 'zod';

const editUserInfoValidation = z.object({
    firstName: z.string().min(3, { message: 'First name is required' }),
    lastName: z.string().min(3, { message: 'Last name is required' }),
    twitterUsername: z.string(),
    facebookUsername: z.string(),
    instagramUsername: z.string(),
    phone: z.string().min(11, 'Invalid phone number'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid Email').min(3, 'Invalid mail'),
    password: z.string().min(6),
});

const signupSchema = z.object({
    email: z.string().email('Invalid Email').min(3, 'Invalid mail'),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

const resetPasswordSchema = z.object({
    email: z.string().email('Invalid Email').min(3, 'Invalid mail'),
});


export {
    editUserInfoValidation,
    loginSchema, resetPasswordSchema, signupSchema
};

