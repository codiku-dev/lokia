import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H2 } from "@/components/ui/typography";
import AnimationExample from "@/examples/animation-example";
import { ControlledDialogExample, DialogExample } from "@/examples/dialog-example";
import { TypoExample } from "@/examples/typo-example";
import { ROUTES } from "@/lib/routes";
import { PagesNavigatorParams } from "@/types/navigation-type.";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SafeAreaView } from "react-native-safe-area-context";

export function Other() {
    const navigation = useNavigation();
    const route = useRoute<typeof ROUTES.OTHER>();
    return (
        <SafeAreaView>
            <H1>Other page</H1>
            <Text>Page navigation params : {route.params.someParam}</Text>
            <Button onPress={() => { navigation.navigate(ROUTES.HOME) }}><Text>Go to Home</Text></Button>
        </SafeAreaView>
    )
}

