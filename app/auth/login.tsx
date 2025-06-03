import Box from '@/components/Box'
import CustomText from '@/components/CustomText'
import AuthHeader from '@/components/auth/AuthHeader'
import { CustomTextInput } from '@/components/form/CustomInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import useForm from '@/hooks/useForm'
import useToast from '@/hooks/useToast'
import { supabase } from '@/lib/supabase'
import { loginSchema } from '@/services/validation'
import { router } from 'expo-router'
import React, { useState } from 'react'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const { renderForm } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema
    });

    // functions
    const handleSubmit = async ({ email, password }: { email: string, password: string }) => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            console.log(data);

            if (error) {
                toast.show(error?.message, { type: 'danger', placement: 'bottom' });
            }
            toast.show('Login successful', { type: 'success', placement: 'bottom' });
            setIsLoading(false);
        } catch (error: any) {
            toast.show(error?.message, { type: 'danger' });
            setIsLoading(false);
        }
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
                <SubmitButton label='Submit' isLoading={isLoading} width={'100%'} onSubmit={(data) => handleSubmit(data)} />
            </Box>
        </Box>
    )
}

export default LoginPage