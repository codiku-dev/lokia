import { useState } from "react";
import { Animated, Image, SafeAreaView } from "react-native";
import BootSplash from "react-native-bootsplash";

type Props = {
    onAnimationEnd: () => void;
    onStartLoading?: () => Promise<void>;
};

export const SplashScreen = ({ onAnimationEnd, onStartLoading }: Props) => {
    const [opacity] = useState(() => new Animated.Value(1));

    const { container, logo } = BootSplash.useHideAnimation({
        manifest: require("../../assets/bootsplash/manifest.json"),
        logo: require("../../assets/bootsplash/logo.png"),

        statusBarTranslucent: true,
        navigationBarTranslucent: false,

        animate: async () => {
            if (onStartLoading) {
                await onStartLoading();
            }
            // Perform animations and call onAnimationEnd
            Animated.timing(opacity, {
                useNativeDriver: true,
                toValue: 0,
                duration: 500,
            }).start(() => {
                onAnimationEnd();
            });
        },
    });

    return (
        <Animated.View {...container} style={[container.style, { opacity }, { marginTop: -25 }]}>
            <Image {...logo} />
        </Animated.View>
    );
};

