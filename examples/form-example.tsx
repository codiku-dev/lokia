import { H2 } from "@/components/ui/typography";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectDialog, SelectDialogItem } from "@/components/ui/select-dialog";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import Toast from "react-native-toast-message";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    newsletter: z.boolean(),
    gender: z.enum(["male", "female", "other"]),
    country: z.string(),
    notifications: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const GENDER_OPTIONS = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
] as const;

export function FormExample() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            newsletter: false,
            gender: "male",
            country: "us",
            notifications: false,
        },
        mode: "onChange",
    });

    function onSubmit(data: FormData) {
        console.log(data);

        Toast.show({
            type: 'info',
            text1: `name: ${data.name} , email: ${data.email} , newsletter: ${data.newsletter} ,`,
            text2: `gender: ${data.gender} , country: ${data.country} , notifications: ${data.notifications}`
        });
    }

    return (
        <View className="gap-4 p-4">
            <H2>Form Example</H2>

            <Controller
                control={form.control}
                name="name"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View className="gap-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="Enter your name"
                            value={value}
                            onChangeText={onChange}
                        />
                        <FormError error={error} />
                    </View>
                )}
            />

            <Controller
                control={form.control}
                name="email"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View className="gap-2">
                        <Label>Email</Label>
                        <Input
                            placeholder="Enter your email"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="email-address"
                        />
                        <FormError error={error} />
                    </View>
                )}
            />

            <Controller
                control={form.control}
                name="newsletter"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View className="gap-2">
                        <View className="flex-row items-center gap-2">
                            <Checkbox
                                checked={value}
                                onCheckedChange={onChange}
                                label="Subscribe to newsletter"
                            />
                        </View>
                        <FormError error={error} />
                    </View>
                )}
            />

            <Controller
                control={form.control}
                name="gender"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View className="gap-2">
                        <Label>Gender</Label>
                        <RadioGroup value={value} onValueChange={onChange}>
                            {GENDER_OPTIONS.map((option) => (
                                <RadioGroupItem key={option.value} option={option} />
                            ))}
                        </RadioGroup>
                        <FormError error={error} />
                    </View>
                )}
            />

            <Controller
                control={form.control}
                name="country"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View className="gap-2">
                        <Label>Country</Label>
                        <SelectDialog value={value} onValueChange={onChange}>
                            <SelectDialogItem value="us" label="United States" />
                            <SelectDialogItem value="ca" label="Canada" />
                            <SelectDialogItem value="uk" label="United Kingdom" />
                            <SelectDialogItem value="fr" label="France" />
                        </SelectDialog>
                        <FormError error={error} />
                    </View>
                )}
            />

            <Controller
                control={form.control}
                name="notifications"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View className="gap-2">
                        <View className="flex-row items-center justify-between">
                            <Label>Enable notifications</Label>
                            <Switch
                                checked={value}
                                onCheckedChange={onChange}
                            />
                        </View>
                        <FormError error={error} />
                    </View>
                )}
            />

            <Button onPress={form.handleSubmit(onSubmit)} disabled={!form.formState.isValid}>
                <Text>Submit</Text>
            </Button>
        </View>
    );
}
