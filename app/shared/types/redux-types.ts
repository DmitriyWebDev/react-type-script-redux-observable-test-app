export type GetAllActionTypes<ActionsMap> = ActionsMap extends { [key: string]: infer Action } ? Action : never;
