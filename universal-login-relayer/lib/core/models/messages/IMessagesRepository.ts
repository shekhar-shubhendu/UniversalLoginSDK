import {CollectedSignatureKeyPair, SignedMessage} from '@universal-login/commons';
import MessageItem from './MessageItem';
import IRepository from './IRepository';

export default interface IMessageRepository extends IRepository<MessageItem> {
  addSignature: (messageHash: string, signature: string) => Promise<void>;
  getMessage: (messageHash: string) => Promise<SignedMessage>;
  getCollectedSignatureKeyPairs: (messageHash: string) => Promise<CollectedSignatureKeyPair[]>;
  containSignature: (messageHash: string, signature: string) => Promise<boolean>;
}
