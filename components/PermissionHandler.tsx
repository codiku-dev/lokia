import { useEffect } from 'react'
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native'

export function PermissionHandler() {
    useEffect(() => {
        requestAllPermissions()
    }, [])

    const requestAllPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                let permissions = []

                // For Android 13+ (API level 33+)
                if (Platform.Version >= 33) {
                    permissions = [
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                    ]
                }
                // For Android 10-12 (API level 29-32)
                else if (Platform.Version >= 29) {
                    permissions = [
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                    ]
                }
                // For Android 9 and below
                else {
                    permissions = [
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    ]
                }

                console.log('Requesting permissions for Android version:', Platform.Version)
                console.log('Requesting permissions:', permissions)

                const results = await PermissionsAndroid.requestMultiple(permissions)

                // Check which permissions were not granted
                const deniedPermissions = Object.entries(results)
                    .filter(([_, result]) => result !== PermissionsAndroid.RESULTS.GRANTED)
                    .map(([permission]) => permission)

                if (deniedPermissions.length > 0) {
                    console.warn('Denied permissions:', deniedPermissions)
                    Alert.alert(
                        'Permissions Required',
                        'Storage permissions are required for the app to function correctly. Please grant all permissions in Settings.',
                        [
                            {
                                text: 'Open Settings',
                                onPress: () => {
                                    if (Platform.OS === 'android') {
                                        Linking.openSettings()
                                    }
                                }
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel'
                            }
                        ]
                    )
                } else {
                    console.log('All permissions granted successfully')
                }
            } catch (err) {
                console.error('Error requesting permissions:', err)
                Alert.alert(
                    'Error',
                    'Failed to request permissions. Please try again or grant permissions manually in Settings.'
                )
            }
        }
    }

    return null
} 