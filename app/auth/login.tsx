
import Box from '@/components/Box'
import CustomText from '@/components/CustomText'
import AuthHeader from '@/components/auth/AuthHeader'
import { CustomTextInput } from '@/components/form/CustomInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import Urls from '@/hooks/http/urls'
import useForm from '@/hooks/useForm'
import useToast from '@/hooks/useToast'
import { loginSchema } from '@/services/validation'
import httpService from '@/utils/httpService'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React from 'react'

const LoginPage = () => {
    const toast = useToast();
    const { renderForm } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema
    });

    // handle mutation
    const { isPending, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`${Urls.auth}/login`, data),
        onError: (error: any) => {
            console.log(error);
            toast.show('An Error occured', { type: 'danger', placement: 'top' })
        },
        onSuccess: (data) => {
            toast.show('Login successful', { type: 'success', placement: 'top' });
        }
    })

    // functions
    const handleSubmit = async ({ email, password }: { email: string, password: string }) => {
        console.log({ email, password })
        mutate({ email, password });
    }
    return renderForm(
        <Box flex={1} backgroundColor='secondaryBackgroundColor'>
            <AuthHeader title='Continue with Email' />
            <Box flex={1} paddingHorizontal='m' paddingTop='m'>
                <CustomTextInput name='email' placeholder='Enter your email' label='Email' showLabel isPassword={false} />
                <Box height={20} />
                <CustomTextInput name='password' placeholder='Enter your password' label='Password' showLabel isPassword={true} />

                <CustomText variant='medium' fontSize={16} mt='m'>I forgot my password</CustomText>
                <Box height={50} />
                <CustomText onPress={() => router.push('/auth/signup')} variant='medium' fontSize={16} marginBottom='l' color='primaryColor' textAlign='center'>Don&apos;t have an account? Lets Create one!</CustomText>
                <SubmitButton label='Submit' isLoading={isPending} width={'100%'} onSubmit={(data) => handleSubmit(data)} />
            </Box>
        </Box>
    )
}

export default LoginPage