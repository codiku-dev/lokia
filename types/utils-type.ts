type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

export type WithoutFunctions<T> = Pick<T, NonFunctionPropertyNames<T>>;
