import { merge } from 'lodash-es';

import { environment as local } from './environment.local';
import { IEnvironment, environment as prod } from './environment.prod';

const environment: IEnvironment = merge( {}, prod, local);
//const environment: IEnvironment = prod;
export { environment };