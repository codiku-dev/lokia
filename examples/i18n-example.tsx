import { Button } from "@/components/ui/button";
import { SelectDialog, SelectDialogItem } from "@/components/ui/select-dialog";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { View } from "react-native";
import { LANGUAGES, type Language } from "@/i18n/i18n";

export const I18nExample = () => {
    const { i18n } = useTranslation();
    return <View>
        <H2>I18n Example</H2>
        <Text>{<Trans i18nKey="welcome" />}</Text>
        <SelectDialog value={i18n.language} onValueChange={i18n.changeLanguage}>
            {LANGUAGES.map((language: Language) => (
                <SelectDialogItem key={language} value={language} label={language} />
            ))}
        </SelectDialog>
    </View>
}   
