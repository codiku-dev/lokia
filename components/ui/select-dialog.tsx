import * as React from 'react';
import { View, Pressable } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { Text } from './text';
import { ScrollView } from 'react-native';

type SelectDialogProps = {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    children: React.ReactElement<SelectDialogItemProps>[];
    className?: string;
    disabled?: boolean;
};

type SelectDialogItemProps = {
    value: string;
    label: string;
    onPress?: () => void;
    selected?: boolean;
};

export function SelectDialogItem({ value, label, onPress, selected }: SelectDialogItemProps) {
    return (
        <Pressable
            onPress={onPress}
            className={cn(
                'flex-row items-center justify-between p-4 border-b border-border',
                selected && 'bg-accent'
            )}
        >
            <Text>{label}</Text>
            {selected && <Check size={16} className="text-primary" />}
        </Pressable>
    );
}

export function SelectDialog({
    value,
    onValueChange,
    placeholder = "Select an option",
    children,
    className,
    disabled
}: SelectDialogProps) {
    const [open, setOpen] = React.useState(false);

    // Find the selected item's label
    const selectedItem = React.Children.toArray(children).find(
        (child) => React.isValidElement<SelectDialogItemProps>(child) && child.props.value === value
    );
    const selectedLabel = React.isValidElement<SelectDialogItemProps>(selectedItem) ? selectedItem.props.label : null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={cn(
                    'flex-row h-12 items-center justify-between rounded-md border border-input bg-background px-3 py-2',
                    disabled && 'opacity-50',
                    className
                )}
                disabled={disabled}
            >
                <Text className={cn(!selectedLabel && 'text-muted-foreground')}>
                    {selectedLabel || placeholder}
                </Text>
                <ChevronDown size={16} className="opacity-50" />
            </DialogTrigger>
            <DialogContent showCloseButton={false} fullScreen>
                <ScrollView className="max-h-[80vh]">
                    {React.Children.map(children, (child) => {
                        if (!React.isValidElement<SelectDialogItemProps>(child)) return null;
                        return React.cloneElement(child, {
                            selected: child.props.value === value,
                            onPress: () => {
                                onValueChange?.(child.props.value);
                                setOpen(false);
                            },
                        });
                    })}
                </ScrollView>
            </DialogContent>
        </Dialog>
    );
} 