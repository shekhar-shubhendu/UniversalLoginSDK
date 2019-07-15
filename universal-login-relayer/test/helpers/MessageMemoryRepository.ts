import {Contract, Wallet} from 'ethers';
import {MessageStatus, SignedMessage, stringifySignedMessageFields, bignumberifySignedMessageFields, ensureNotNull, ensure} from '@universal-login/commons';
import WalletContract from '@universal-login/contracts/build/WalletMaster.json';
import {getKeyFromHashAndSignature} from '../../lib/core/utils/utils';
import {InvalidMessage, MessageNotFound, InvalidTransaction} from '../../lib/core/utils/errors';
import MessageItem from '../../lib/core/models/messages/MessageItem';
import IMessageRepository from '../../lib/core/services/messages/IMessagesRepository';

export default class MessageMemoryRepository implements IMessageRepository {
  public messageItems: Record<string, MessageItem>;

  constructor () {
    this.messageItems = {};
  }

  async add(messageHash: string, messageItem: MessageItem) {
    ensureNotNull(messageItem.message, MessageNotFound, messageHash);
    messageItem.message = bignumberifySignedMessageFields(stringifySignedMessageFields(messageItem.message));
    this.messageItems[messageHash] = messageItem;
  }

  async isPresent(messageHash: string) {
    return messageHash in this.messageItems;
  }

  throwIfInvalidMessage(messageHash: string) {
    if (!this.messageItems[messageHash]) {
      throw new InvalidMessage(messageHash);
    }
  }

  async get(messageHash: string): Promise<MessageItem> {
    this.throwIfInvalidMessage(messageHash);
    return this.messageItems[messageHash];
  }

  async remove(messageHash: string): Promise<MessageItem> {
    const messageItem = this.messageItems[messageHash];
    delete this.messageItems[messageHash];
    return messageItem;
  }

  async containSignature(messageHash: string, signature: string) : Promise<boolean> {
    const message = this.messageItems[messageHash];
    return !!message && message
      .collectedSignatureKeyPairs
      .filter((collectedSignature) => collectedSignature.signature === signature)
      .length > 0;
  }

  async getStatus(messageHash: string, wallet: Wallet) : Promise<MessageStatus>  {
    this.throwIfInvalidMessage(messageHash);
    const message = this.messageItems[messageHash];
    const walletContract = new Contract(message.walletAddress, WalletContract.interface, wallet);
    const required = await walletContract.requiredSignatures();
    const status: MessageStatus = {
      collectedSignatures: message.collectedSignatureKeyPairs.map((collected) => collected.signature),
      totalCollected: message.collectedSignatureKeyPairs.length,
      required: required.toNumber(),
      state: message.state
    };
    const {error, transactionHash} = message;
    if (error) {
      status.error = error;
    }
    if (transactionHash) {
      status.transactionHash = transactionHash;
    }
    return status;
  }

  async getCollectedSignatureKeyPairs(messageHash: string) {
    return this.messageItems[messageHash].collectedSignatureKeyPairs;
  }

  async addSignedMessage(messageHash: string, signedMessage: SignedMessage) {
    this.messageItems[messageHash].message = bignumberifySignedMessageFields(stringifySignedMessageFields(signedMessage));
  }

  async getMessage(messageHash: string) {
    const message = (await this.get(messageHash)).message;
    ensureNotNull(message, MessageNotFound, messageHash);
    return message as SignedMessage;
  }

  async addSignature(messageHash: string, signature: string) {
    const key = getKeyFromHashAndSignature(messageHash, signature);
    this.messageItems[messageHash].collectedSignatureKeyPairs.push({signature, key});
  }

  async markAsSuccess(messageHash: string, transactionHash: string) {
    ensure(transactionHash.length === 66, InvalidTransaction, transactionHash);
    this.messageItems[messageHash].transactionHash = transactionHash;
  }

  async markAsError(messageHash: string, error: string) {
    this.messageItems[messageHash].error = error;
  }
}