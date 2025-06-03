import Box from '@/components/Box';
import CustomText from '@/components/CustomText';
import useToast from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthCallback() {
    const router = useRouter();
    const toast = useToast();
    const params = useLocalSearchParams();

    useEffect(() => {
        const handleEmailConfirmation = async () => {
            try {
                const { error } = await supabase.auth.exchangeCodeForSession(params.code as string);

                if (error) {
                    toast.show('Error confirming email: ' + error.message, { type: 'danger' });
                    router.replace('/auth/login');
                } else {
                    toast.show('Email confirmed successfully!', { type: 'success' });
                    router.replace('/auth/login');
                }
            } catch (error: any) {
                toast.show('Error confirming email: ' + error.message, { type: 'danger' });
                router.replace('/auth/login');
            }
        };

        if (params.code) {
            handleEmailConfirmation();
        }
    }, [params.code]);

    return (
        <Box flex={1} justifyContent="center" alignItems="center" backgroundColor="mainBackgroundColor">
            <CustomText variant="header2">Confirming your email...</CustomText>
        </Box>
    );
} 