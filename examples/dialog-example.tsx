import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Text } from "@/components/ui/text";
import { H2 } from '@/components/ui/typography';
import { useState } from 'react';
import { View } from 'react-native';

export function DialogExample() {
    return (
        <>
            <H2>Dialog</H2>
            <Dialog>
                <DialogTrigger>
                    <Text>Open Classic Dialog</Text>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><Text>My Dialog</Text></DialogTitle>
                        <DialogDescription><Text>This is a simple dialog</Text></DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Text>Footer</Text>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}


export function ControlledDialogExample() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Text>Open Controlled Dialog</Text>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle><Text>Controlled Dialog</Text></DialogTitle>
                    <DialogDescription>
                        <Text>This dialog is controlled by state</Text>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onPress={() => setOpen(false)}>
                        <Text>Close Dialog</Text>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function FullScreenDialogExample() {
    const [openNoClose, setOpenNoClose] = useState(false);

    return (
        <Dialog open={openNoClose} onOpenChange={setOpenNoClose}>
            <DialogTrigger>
                <Text>Open Full Screen Dialog</Text>
            </DialogTrigger>
            <DialogContent fullScreen showCloseButton={false}>
                <View className="flex-1">
                    <View className="p-6">
                        <DialogHeader>
                            <DialogTitle><Text>Full Screen Dialog</Text></DialogTitle>
                            <DialogDescription>
                                <Text>This is a full screen dialog example without close button</Text>
                            </DialogDescription>
                        </DialogHeader>
                    </View>
                    <View className="items-center justify-center flex-1">
                        <Text>Full screen content goes here</Text>
                    </View>
                    <View className="p-6">
                        <DialogFooter>
                            <Button onPress={() => setOpenNoClose(false)}>
                                <Text>Close Dialog</Text>
                            </Button>
                        </DialogFooter>
                    </View>
                </View>
            </DialogContent>
        </Dialog>
    );
}
