//@ts-nocheck
import { injectable } from 'inversify';
import { IUIAction } from './IUIAction.js';

@injectable()
export class UIAction<TConfig> implements IUIAction {
  config: TConfig;

  constructor(config: TConfig) {
    this.config = config;
  }
  execute() {
    return;
  }
}
