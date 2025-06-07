import * as React from 'react';
import { Text } from './text';
import { cn } from '@/lib/utils';

type FormErrorProps = {
    error?: { message?: string };
    className?: string;
};

function FormError({ error, className }: FormErrorProps) {
    if (!error?.message) return null;

    return (
        <Text className={cn("text-destructive text-sm", className)}>
            {error.message}
        </Text>
    );
}

export { FormError }; 