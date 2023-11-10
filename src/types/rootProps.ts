import { INote } from "../interfaces/INotes";

export type RootNavigatorParamList = {
  Home: undefined;
  NewNote: { note: INote | undefined };
};