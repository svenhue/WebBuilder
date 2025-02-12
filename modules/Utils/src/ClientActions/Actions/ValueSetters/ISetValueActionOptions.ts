import { SetterActionTargetTypes } from './SetterActionTargetTypes.js';

export interface ISetValueActionOptions {
  key: string;
  value: any;
  targetType: SetterActionTargetTypes;
  targetKey: string; //view id +contextid or viewmodel name + contextid
}
