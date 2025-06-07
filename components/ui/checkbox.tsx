import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react-native';
import { Label } from './label';

type CheckboxProps = CheckboxPrimitive.RootProps & {
    ref?: React.RefObject<CheckboxPrimitive.RootRef>;
    label?: string;
};

function Checkbox({
    className,
    label,
    ...props
}: CheckboxProps) {
    return (
        <View className='flex flex-row items-center gap-2'>
            <CheckboxPrimitive.Root
                className={cn(
                    'web:peer h-4 w-4 native:h-[20] native:w-[20] shrink-0 rounded-sm native:rounded border border-primary web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    props.checked && 'bg-primary',
                    className
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator className={cn('items-center justify-center h-full w-full')}>
                    <Check
                        size={24}
                        strokeWidth={2}
                        className='text-secondary'
                    />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            {label && (
                <Label
                    onPress={() => {
                        props.onCheckedChange?.(!props.checked);
                    }}
                >
                    {label}
                </Label>
            )}
        </View>
    );
}

export { Checkbox };