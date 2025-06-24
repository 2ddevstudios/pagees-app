import Box from '@/components/Box'
import CustomText from '@/components/CustomText'
import AuthHeader from '@/components/auth/AuthHeader'
import { CustomTextInput } from '@/components/form/CustomInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import Urls from '@/hooks/http/urls'
import useForm from '@/hooks/useForm'
import useToast from '@/hooks/useToast'
import { emailVerificationSchema } from '@/services/validation'
import httpService from '@/utils/httpService'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React from 'react'

const VerifyEmail = () => {

    const toast = useToast();

    const { renderForm } = useForm({
        defaultValues: {
            code: '',
        },
        validationSchema: emailVerificationSchema
    });

    // handle mutation
    const { isPending, mutate } = useMutation({
        mutationFn: (data: string) => httpService.get(`${Urls.auth}/verify-token/${data}`),
        onError: (error: any) => {
            toast.show(error?.message, { type: 'danger', placement: 'top' })
        },
        onSuccess: (data) => {
            console.log(data.data);
            toast.show('Email verified', { type: 'success', placement: 'top' });
            router.push('/auth/setup');
        }
    })

    // functions
    const handleSubmit = async ({ code }: { code: string }) => {
        try {
            mutate(code);
        } catch (error: any) {
            toast.show(error?.message, { type: 'danger' });
        }
    }

    return renderForm(
        <Box flex={1} backgroundColor='secondaryBackgroundColor'>
            <AuthHeader title='Verify Email' />
            <Box flex={1} paddingHorizontal='m' paddingTop='m'>
                <CustomText>Enter the OTP code sent to your email</CustomText>
                <Box height={20} />

                <CustomTextInput name='code' placeholder='Enter your OTP code' label='OTP Code' showLabel isPassword={false} />


                <Box height={50} />
                <SubmitButton label='Submit' isLoading={isPending} width={'100%'} onSubmit={(data) => handleSubmit(data)} />
            </Box>
        </Box>
    )
}

export default VerifyEmail