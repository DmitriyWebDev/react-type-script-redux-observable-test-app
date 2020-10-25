import rootReducer from '../../redux/rootReducer';

export type GetAllActionTypes<ActionsMap> = ActionsMap extends { [key: string]: infer Action } ? Action : never;
export type RootStoreData = ReturnType<typeof rootReducer>;
