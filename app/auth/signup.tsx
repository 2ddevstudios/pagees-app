
import Box from '@/components/Box'
import CustomText from '@/components/CustomText'
import AuthHeader from '@/components/auth/AuthHeader'
import { CustomTextInput } from '@/components/form/CustomInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import Urls from '@/hooks/http/urls'
import useForm from '@/hooks/useForm'
import useToast from '@/hooks/useToast'
import { signupSchema } from '@/services/validation'
import httpService from '@/utils/httpService'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { atom, useSetAtom } from 'jotai'
import React from 'react'

export const signupIdAtom = atom<string | null>(null);

const SignupPage = () => {
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

    // handle mutation
    const { isPending, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`${Urls.auth}/create`, data),
        onError: (error: any) => {
            toast.show(error?.message, { type: 'danger', placement: 'top' })
        },
        onSuccess: (data) => {
            console.log(data.data);
            setId(data?.data.data?._id as string);
            toast.show('Please check your email for an OTP code', { type: 'success', placement: 'top' });
            router.push('/auth/verifyemail');
        }
    })

    // functions
    const handleSubmit = async ({ email, password }: { email: string, password: string }) => {
        try {
            mutate({ email, password });
        } catch (error: any) {
            toast.show(error?.message, { type: 'danger' });
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
                <SubmitButton label='Submit' isLoading={isPending} width={'100%'} onSubmit={(data) => handleSubmit(data)} />
            </Box>
        </Box>
    )
}

export default SignupPage