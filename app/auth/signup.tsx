/* eslint-disable import/no-unresolved */
import Box from '@/components/Box'
import CustomText from '@/components/CustomText'
import AuthHeader from '@/components/auth/AuthHeader'
import { CustomTextInput } from '@/components/form/CustomInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import useForm from '@/hooks/useForm'
import useToast from '@/hooks/useToast'
import { supabase } from '@/lib/supabase'
import { signupSchema } from '@/services/validation'
import { router } from 'expo-router'
import { atom, useSetAtom } from 'jotai'
import React, { useState } from 'react'

export const signupIdAtom = atom<string | null>(null);

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const setId = useSetAtom(signupIdAtom);

    const toast = useToast();
    const { renderForm } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signupSchema,
    });

    // functions
    const handleSubmit = async ({ email, password }: { email: string, password: string }) => {
        try {
            setIsLoading(true);
            // check the database for the email first
            const { data: UserExist, error: UserExistError } = await supabase
                .from('Users')
                .select('email')
                .eq('email', email)
                .single();

            if (UserExist) {
                console.log(UserExist);
                toast.show('A user with this email already exisits', { type: 'danger', placement: 'bottom' });
                setIsLoading(false);
                return;
            }

            // signup the user
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });

            if (!error) {
                console.log(data);
                // create the User details
                const details = await supabase.from('Users').insert({
                    email,
                    id: data?.user?.id,
                });
                console.log(details);
                setId(data?.user?.id as string);
                toast.show('Please check your email for a confirmation link', { type: 'success', placement: 'bottom' });
                setIsLoading(false);
                router.push('/auth/setup');
            }

            if (error) {
                toast.show(error?.message, { type: 'danger', placement: 'bottom' });
                setIsLoading(false);
            }

        } catch (error: any) {
            toast.show(error?.message, { type: 'danger' });
            setIsLoading(false);
        }
    }
    return renderForm(
        <Box flex={1} backgroundColor='secondaryBackgroundColor'>
            <AuthHeader title='Sign Up' />
            <Box flex={1} paddingHorizontal='m' paddingTop='m'>
                <CustomTextInput name='email' placeholder='Enter your email' label='Email' showLabel isPassword={false} />
                <Box height={20} />
                <CustomTextInput name='password' placeholder='Enter your password' label='Password' showLabel isPassword={true} />
                <Box height={20} />
                <CustomTextInput name='confirmPassword' placeholder='Confirm your password' label='Confirm Password' showLabel isPassword={true} />

                <Box height={50} />
                <CustomText onPress={() => router.push('/auth/login')} variant='medium' fontSize={16} marginBottom='l' color='primaryColor' textAlign='center'>Already have an account? Login</CustomText>
                <SubmitButton label='Submit' isLoading={isLoading} width={'100%'} onSubmit={(data) => handleSubmit(data)} />
            </Box>
        </Box>
    )
}

export default SignupPage