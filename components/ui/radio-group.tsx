import * as React from 'react';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Pressable, View } from 'react-native';
import { cn } from '@/lib/utils';
import { Label } from './label';

function RadioGroup({
    className,
    onValueChange,
    children,
    ...props
}: RadioGroupPrimitive.RootProps & {
    ref?: React.RefObject<RadioGroupPrimitive.RootRef>;
}) {
    return (
        <RadioGroupPrimitive.Root
            className={cn('web:grid gap-2', className)}
            {...props}
            onValueChange={onValueChange}
        >
            {/* Pass the onValueChange to the children */}
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        onValueChange
                    });
                }
                return child;
            })}
        </RadioGroupPrimitive.Root>
    );
}

function RadioGroupItem({
    className,
    option,
    onValueChange,
    ...props
}: Omit<RadioGroupPrimitive.ItemProps, 'value'> & {
    ref?: React.RefObject<RadioGroupPrimitive.ItemRef>;
    option: {
        label: string;
        value: string;
    };
    onValueChange?: (value: string) => void;
}) {
    return (
        <View className='flex flex-row gap-2'>
            <RadioGroupPrimitive.Item
                className={cn(
                    'aspect-square h-4 w-4 native:h-5 native:w-5 rounded-full justify-center items-center border border-primary text-primary web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
                    props.disabled && 'web:cursor-not-allowed opacity-50',
                    className
                )}
                {...props}
                value={option.value}
            >
                <RadioGroupPrimitive.Indicator className='flex items-center justify-center' >
                    <View className='aspect-square h-[9px] w-[9px] native:h-[10] native:w-[10] bg-primary rounded-full' />
                </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <Label
                onPress={() => {
                    onValueChange?.(option.value);
                }}
            >
                {option.label}
            </Label>
        </View>
    );
}

export { RadioGroup, RadioGroupItem };