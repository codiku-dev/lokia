import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";
import { ROUTES } from "@/lib/routes";
import { useNavigation } from "@react-navigation/native";

export function NavigationExample() {
    const navigation = useNavigation();
    return (
        <>
            <H2>Navigation</H2>
            <Button onPress={() => { navigation.navigate(ROUTES.OTHER, { someParam: "someValues" }) }}><Text>Go to Other</Text></Button>
        </>
    )
}
