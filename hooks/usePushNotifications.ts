import { useState, useEffect, useRef } from 'react'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Contants from 'expo-constants';
import { Platform } from 'react-native';
import React from 'react';


export interface PushNotificationState {
    expoPushToken?: Notifications.ExpoPushToken,
    notification?: Notifications.Notification,
    devicePushToken?: Notifications.DevicePushToken,
    callNotitifaction: () => void,
}

export const usePushNotification = (): PushNotificationState => {
    // check if the user is loged in b4 asking


    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    async function registerFoPushNotifications() {
        let token;
        let deviceToken;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                //alert('Failed to get push token for push notification!');
                return;
            }

            // deviceToken = await Notifications.getDevicePushTokenAsync()

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Contants.expoConfig?.extra?.eas?.projectId
            });
        } else {
            //alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                showBadge: true,
            }).then();
        }

        return {
            token,
            deviceToken
        };
    }

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
            console.log(response);
        })

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current!);
            Notifications.removeNotificationSubscription(responseListener.current!);
        }
    }, []);

    const CallNotification = React.useCallback(() => {
        registerFoPushNotifications().then(data => {
            setExpoPushToken(data?.token);
        });
    },[expoPushToken, notification])

    return {
        expoPushToken,
        notification,
        callNotitifaction: CallNotification,
    }
}