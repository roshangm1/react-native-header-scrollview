import { NativeModules } from 'react-native';

type HeaderScrollviewType = {
  multiply(a: number, b: number): Promise<number>;
};

const { HeaderScrollview } = NativeModules;

export default HeaderScrollview as HeaderScrollviewType;
