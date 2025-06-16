import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import * as LucideIcons from 'lucide-react-native';

/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */
/* ADD ICONS HERE TO BE ABLE TO USE CLASSNAME */

// Convert all icons to array for processing
const ICONS = Object.values(LucideIcons).filter(
    (icon: any) => icon?.displayName! !== undefined
);
console.log('ICONS', ICONS);

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

// Apply className to all icons
for (const icon of ICONS) {
    iconWithClassName(icon as LucideIcon);
}

// Export all icons
export const Icons = LucideIcons;
export type IconName = keyof typeof Icons;
