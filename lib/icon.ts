import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { Check, X } from 'lucide-react-native';

/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
const ICONS = [Check, X];


export function iconWithClassName(icon: LucideIcon) {
    cssInterop(icon, {
        className: {
            target: 'style',
            nativeStyleToProp: {
                color: true,
                opacity: true,
            },
        },
    });
}

for (const icon of ICONS) {
    iconWithClassName(icon);
}
