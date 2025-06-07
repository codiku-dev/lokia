import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "@/lib/routes";
import { RouteProp } from "@react-navigation/native";


export type PagesNavigatorParams = {
    [ROUTES.HOME]: undefined;
    [ROUTES.OTHER]: {
        someParam: string;
    };
};


declare module "@react-navigation/native" {
    export function useNavigation<T = NativeStackNavigationProp<PagesNavigatorParams>>(): T;
}

declare module "@react-navigation/native" {
    export function useRoute<T extends keyof PagesNavigatorParams>(): RouteProp<PagesNavigatorParams, T>;
}

