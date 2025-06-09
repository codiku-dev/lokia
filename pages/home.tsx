
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { H1, H4 } from '@/components/ui/typography';
import { View } from 'react-native';
import { AiChat } from '@/features/ai-chat/ai-chat';
import Logo from '@/assets/images/mia-logo.svg';

export function Home() {

    return (
        <SafeAreaView className='page' >
            <View className='p-4'>
                <View className='flex-row items-center gap-2'>
                    <Logo width={50} height={50} />
                    <H1>Mia</H1>
                </View>
                <H4 className='text-gray-500'>Your ai assistant - 100% local 🤗</H4>
            </View>
            <AiChat />
        </SafeAreaView>
    )
}
