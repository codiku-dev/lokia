import { AppProviders } from "@/providers/app-providers";

export function TestProvider({ children }: { children: React.ReactNode }) {
    return (
        <AppProviders>
            {children}
        </AppProviders>

    );
}
