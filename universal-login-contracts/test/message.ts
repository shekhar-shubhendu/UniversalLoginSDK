import {utils} from 'ethers';
import {expect} from 'chai';
import {SignedMessage, TEST_CONTRACT_ADDRESS, Message, TEST_ACCOUNT_ADDRESS, EMPTY_DATA, DEFAULT_GAS_PRICE, DEFAULT_GAS_LIMIT} from '@universal-login/commons';
import TEST_PAYMENT_OPTIONS from '../lib/defaultPaymentOptions';
import {messageToUnsignedMessage, unsignedMessageToSignedMessage} from '../lib/message';

const {bigNumberify} = utils;

describe('messageToUnsignedMessage', () => {
  it('correct transform', async () => {
    const incomingMessage: Partial<Message> = {
      from: TEST_CONTRACT_ADDRESS,
      to: TEST_CONTRACT_ADDRESS,
      value: utils.parseEther('1'),
      gasPrice: TEST_PAYMENT_OPTIONS.gasPrice,
      gasToken: TEST_PAYMENT_OPTIONS.gasToken,
      data: '0xbeef',
      gasLimit: bigNumberify(100000),
      nonce: 0
    };

    const expectedUnsignedMessage: Partial<SignedMessage> = {
      from: TEST_CONTRACT_ADDRESS,
      to: TEST_CONTRACT_ADDRESS,
      value: utils.parseEther('1'),
      gasPrice: TEST_PAYMENT_OPTIONS.gasPrice,
      gasToken: TEST_PAYMENT_OPTIONS.gasToken,
      data: '0xbeef',
      gasData: bigNumberify(8976),
      gasLimitExecution: bigNumberify(100000 - 8976),
      nonce: 0,
    };

    const actualUnsginedMessage = messageToUnsignedMessage(incomingMessage);

    expect(actualUnsginedMessage).to.deep.equal(expectedUnsignedMessage);
  });
});

describe('unsignedMessageToSignedMessage', async () => {
  it('sign a message', async () => {
    const transferMessage = {
      to: TEST_ACCOUNT_ADDRESS,
      value: utils.parseEther('0.5'),
      data: EMPTY_DATA,
      nonce: '0',
      gasPrice: DEFAULT_GAS_PRICE,
      gasLimitExecution: DEFAULT_GAS_LIMIT,
      gasData: '0',
      gasToken: '0x0000000000000000000000000000000000000000',
    };

    const expectedMessage = {
      from: '0x',
      to: TEST_ACCOUNT_ADDRESS,
      value: utils.parseEther('0.5'),
      data: EMPTY_DATA,
      nonce: '0',
      gasPrice: transferMessage.gasPrice,
      gasLimitExecution: transferMessage.gasLimitExecution,
      gasData: '0',
      gasToken: '0x0000000000000000000000000000000000000000',
      signature: '0xd632d56c1558e60e59cf2332d8e0e47bb52e34ea92c8dc210bec90b0b60f39204959e832ba6a3efa67be0f6cae082cf7bea3a849dd0091bfe75babc281235f9d1b'
    };

    const privateKey = '0x899d97b42f840d59d60f3a18514b28042a1d86fa400d6cf9425ec3a9217d0cea';

    const signedMessage = unsignedMessageToSignedMessage({...transferMessage, from: '0x'}, privateKey);
    expect(signedMessage).to.deep.eq(expectedMessage);
  });
});
