import { H1 } from "@/components/ui/typography";
import { ScrollView, View } from "react-native";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormExample } from "./form-example";
import { Separator } from "@/components/ui/separator";
import { TypoExample } from "./typo-example";
import { NavigationExample } from "./navigation-example";
import { ControlledDialogExample, DialogExample, FullScreenDialogExample } from "./dialog-example";
import AnimationExample from "./animation-example";
import { StoreExample } from "./store-example";
import { I18nExample } from "./i18n-example";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Examples() {
    const insets = useSafeAreaInsets();
    const [value, setValue] = useState(true);

    return (
        <>
            <H1 className="mb-4" >Examples</H1>
            <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
                <View className="flex flex-col gap-4">
                    <View className="mb-4">
                        <TypoExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <NavigationExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <DialogExample />
                        <ControlledDialogExample />
                        <FullScreenDialogExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <AnimationExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <FormExample />
                    </View>
                    <Separator />

                    <View className="mb-4">
                        <StoreExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <I18nExample />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
