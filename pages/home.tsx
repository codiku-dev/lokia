
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Examples } from '@/examples/examples';


export function Home() {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView className='page' >
            <Examples />
        </SafeAreaView>
    )
}
