import {Wallet, providers} from 'ethers';
import {SignedMessage, ensure, calculateMessageHash} from '@universal-login/commons';
import IMessageValidator from '../../../core/models/IMessageValidator';
import {messageToTransaction} from '../../../core/utils/messages/serialisation';
import {NotEnoughGas} from '../../../core/utils/errors';

export default class EstimateGasValidator implements IMessageValidator {
  constructor(private wallet: Wallet) {}

  async validate(signedMessage: SignedMessage) {
    const transactionReq: providers.TransactionRequest = messageToTransaction(signedMessage);
    let messageHash;
    try {
      messageHash = await this.wallet.provider.call({ ...transactionReq, from: this.wallet.address }); // TODO estimate gas
    }
    catch (e) {
      throw new NotEnoughGas();
    }
    const calculatedMessageHash = calculateMessageHash(signedMessage);
    ensure(messageHash === calculatedMessageHash, NotEnoughGas);
  }
}
