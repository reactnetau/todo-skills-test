import { RootNavigatorParamList } from "./rootProps";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


export type HomeStackNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'NewNote'
>;