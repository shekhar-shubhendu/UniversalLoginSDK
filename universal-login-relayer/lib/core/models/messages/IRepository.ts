import {MineableState} from '@universal-login/commons';
import {Mineable} from '../Mineable';

export default interface IRepository<T extends Mineable> {
  add: (hash: string, item: T) => Promise<void>;
  get: (hash: string) => Promise<T>;
  isPresent: (hash: string) => Promise<boolean>;
  remove: (hash: string) => Promise<T>;
  markAsPending: (hash: string, transactionHash: string) => Promise<void>;
  markAsError: (hash: string, error: string) => Promise<void>;
  setState: (hash: string, state: MineableState) => Promise<void>;
}
