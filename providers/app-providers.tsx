import "@/global.css"
import "@/lib/icon";
import "@/i18n/i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/configs/react-query-config";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>
        {children}
        <Toast />
    </QueryClientProvider>
}
