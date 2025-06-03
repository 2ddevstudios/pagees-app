import { z } from 'zod';

const editUserInfoValidation = z.object({
    firstName: z.string().min(3, { message: 'First name is required' }),
    lastName: z.string().min(3, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email' }).min(3, { message: 'Email is required' }),
});

const loginSchema = z.object({
    email: z.string().email('Invalid Email').min(3, 'Invalid mail'),
    password: z.string().min(6),
});

const signupSchema = z.object({
    email: z.string().email('Invalid Email').min(3, 'Invalid mail'),
    referralCode: z.string().optional(),
});

const resetPasswordSchema = z.object({
    email: z.string().email('Invalid Email').min(3, 'Invalid mail'),
});

const personalProfileSchema = z.object({
    email: z.string().email('Invalid email').min(3, 'Invalid email address'),
    firstName: z.string().min(3, 'Invalid name'),
    lastName: z.string().min(3, 'Invalid name'),
    occupation: z.string().min(3, 'Invalid occupation'),
    phone: z.string().min(11, 'Invlaid phone number').max(15, 'Invalid phone number')
});

const corporateProfileSchema = z.object({
    email: z.string().email('Invalid email').min(3, 'Invalid email address'),
    companyName: z.string().min(3, 'Invalid company name'),
    CACNumber: z.string().min(3, 'Invalid CAC number'),
    phone: z.string().min(11, 'Invlaid phone number').max(15, 'Invalid phone number')
});

const addressSchema = z.object({
    address: z.string().min(3, 'Invalid address'),
    city: z.string().min(3, 'Invalid city'),
});

const nextOfKinSchema = z.object({
    firstName: z.string().min(3, 'Invalid name'),
    lastName: z.string().min(3, 'invalida name'),
    phone: z.string().min(11, 'Invlaid phone number').max(15, 'Invalid phone number'),
    email: z.string().email('Invalid email').min(3, 'Invalid email address'),
    relationship: z.string().min(3, 'Invalid email address'),
});

const editProfileSchema = z.object({
    firstName: z.string().min(3, 'Invalid name'),
    lastName: z.string().min(3, 'invalida name'),
    email: z.string().email('Invalid email'),
});

const createProjectSchema = z.object({
    projectType: z.string().min(3, 'Invalid project type'),
    buildingType: z.string().min(3,'Invalid building type'),
    projectAddress: z.string().min(3, 'Invalid Address'),
    projectDescription: z.string().min(3, 'Invalid description'),
});

const projectMaterialCreationSchema = z.object({
    furnishingType: z.string().min(3, 'Invalid furnishing type'),
    cement: z.string().min(3, 'Invalid cement type'),
    flooring: z.string().min(3, 'Invalid flooring type'),
    windows: z.string().min(3, 'Invalid windows type'),
    doors: z.string().min(3, 'Invalid door type'),
});

export  {
    editUserInfoValidation,
    loginSchema,
    signupSchema,
    resetPasswordSchema,
    personalProfileSchema,
    corporateProfileSchema,
    addressSchema,
    nextOfKinSchema,
    editProfileSchema,
    createProjectSchema,
    projectMaterialCreationSchema,
}