export type ActionTypes<T> = T extends { [key: string]: infer U } ? U : never;
