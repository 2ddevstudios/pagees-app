/* eslint-disable import/no-unresolved */
import { setupStageAtom } from '@/app/auth/setup'
import { signupIdAtom } from '@/app/auth/signup'
import Box from '@/components/Box'
import CustomText from '@/components/CustomText'
import { CustomTextInput } from '@/components/form/CustomInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import useForm from '@/hooks/useForm'
import useToast from '@/hooks/useToast'
import { supabase } from '@/lib/supabase'
import { editUserInfoValidation } from '@/services/validation'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { DocumentUpload } from 'iconsax-react-nativejs'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { KeyboardAvoidingView, useWindowDimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { z } from 'zod'

const InformationPage = () => {
    const [file, setFile] = React.useState<ImagePicker.ImagePickerAsset | null>(null);
    const [loading, setLoading] = React.useState(false);
    // atoms
    const id = useAtomValue(signupIdAtom);
    const setStage = useSetAtom(setupStageAtom);

    const toast = useToast();
    const { height: HEIGHT } = useWindowDimensions();


    const { renderForm } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            twitterUsername: '',
            facebookUsername: '',
            instagramUsername: '',
        },
        validationSchema: editUserInfoValidation
    })

    // functions

    const handleImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            allowsMultipleSelection: false,
            quality: 1,
            presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FORM_SHEET,
        });
        if (!result.canceled) {
            setFile(result.assets[0]);
        }
    }

    const handleSubmit = async (data: z.infer<typeof editUserInfoValidation>) => {
        if (!file) {
            toast.show('You have to select a profile picture', { type: 'warning', placement: 'bottom' });
            return;
        }

        try {
            setLoading(true);

            // First upload the profile picture to Supabase Storage
            const fileExt = file.uri.split('.').pop();
            const fileName = `${id}-${Math.random()}.${fileExt}`;
            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                name: fileName,
                type: `image/${fileExt}`,
            } as any);

            const user = await supabase.auth.getUser();
            console.log('USER');
            console.log(id);

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('pagisbucket')
                .upload(fileName, formData);

            if (uploadError) {
                console.log(uploadError);
                // throw uploadError;
            }

            // Get the public URL for the uploaded image
            const { data: { publicUrl } } = supabase.storage
                .from('pagisbucket')
                .getPublicUrl(fileName);

            // Update the user record in the database
            const { error: updateError } = await supabase
                .from('Users')
                .update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    twitterUsername: data.twitterUsername,
                    facebookUsername: data.facebookUsername,
                    instagramUsername: data.instagramUsername,
                    profilePic: publicUrl,
                })
                .eq('id', id);

            if (updateError) {
                throw updateError;
            }

            toast.show('Profile updated successfully', { type: 'success', placement: 'bottom' });
            setStage(2)// Navigate to the next setup step
        } catch (error: any) {
            toast.show(error?.message || 'An error occurred', { type: 'danger', placement: 'bottom' });
        } finally {
            setLoading(false);
        }
    }

    return renderForm(
        <KeyboardAvoidingView behavior='height'>

            <ScrollView style={{}} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
                <CustomText variant='body' fontSize={16} textAlign='center' marginVertical='m'>Please set up your profile</CustomText>
                <Box width={'100%'} height={150} alignItems='center'>
                    <TouchableOpacity style={{ width: 100, height: 100, borderRadius: 100, overflow: 'hidden' }} onPress={handleImage}>
                        {!file && (
                            <Box flex={1} justifyContent='center' alignItems='center' backgroundColor='primaryColor2'>
                                <DocumentUpload variant='Outline' size={30} color='white' />
                            </Box>
                        )}
                        {file && (
                            <Image source={{ uri: file?.uri }} contentFit='cover' style={{ width: '100%', height: '100%', }} />
                        )}
                    </TouchableOpacity>
                </Box>

                <Box width="100%" flexDirection='row' justifyContent='space-between' marginBottom='m'>
                    <Box width="46%">
                        <CustomTextInput name="firstName" label='First name' placeholder='Enter your first name' showLabel />
                    </Box>

                    <Box width="46%">
                        <CustomTextInput name="lastName" label='Last name' placeholder='Enter your last name' showLabel />
                    </Box>
                </Box>
                <CustomTextInput name='phone' label='Phone number' placeholder='Enter your phone number' showLabel />
                <Box height={20} />
                <CustomText variant='body' mb='m'>Set your social media accounts</CustomText>
                <Box width="100%" flexDirection='row' justifyContent='space-between' marginBottom='m'>
                    <Box width="31%">
                        <CustomTextInput name="twitterUsername" label='X ' placeholder='' showLabel />
                    </Box>

                    <Box width="31%">
                        <CustomTextInput name="facebookUsername" label='Facebook' placeholder='' showLabel />
                    </Box>

                    <Box width="31%">
                        <CustomTextInput name="instagramUsername" label='Instagram' placeholder='' showLabel />
                    </Box>
                </Box>
                <Box height={40} />
                <SubmitButton width={'100%'} label='Continue' onSubmit={(data) => handleSubmit(data)} isLoading={loading} />
            </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default InformationPage