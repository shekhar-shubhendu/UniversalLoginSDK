import {expect} from 'chai';
import {SignedMessage} from '@universal-login/commons';
import {encodeDataForExecuteSigned, messageToSignedMessage} from '@universal-login/contracts';
import {decodeDataForExecuteSigned} from '../../../lib/core/utils/messages/serialisation';
import {transferMessage} from '../../fixtures/basicWalletContract';

describe('UNIT: Coding transaction data', () => {
  let message: SignedMessage;
  const privateKey = '0x29f3edee0ad3abf8e2699402e0e28cd6492c9be7eaab00d732a791c33552f797';
  const encodedMessage = '0xa9cf197e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000006f05b59d3b20000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ef300000000000000000000000000000000000000000000000000000000000001e100000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000002030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041d10ad363fae9db2945c159ec2c1b80e504b94ebbfdb16cb94cffc538e855a1210346f7313d85b25cdcc009ffe7b3806c55d37f6a24c56c37cbcbcdd04c8f2edf1b00000000000000000000000000000000000000000000000000000000000000';

  before(async () => {
    message = messageToSignedMessage({...transferMessage, from: '0x123'}, privateKey);
  });

  it('should correctly encode SignedMessage', () => {
    const encoded = encodeDataForExecuteSigned(message);
    expect(encoded).to.be.eq(encodedMessage);
  });

  it('should correctly decode encoded SignedMessage', () => {
    const {from, nonce, ...messageWithoutFromAndNonce} = message;
    const decoded = decodeDataForExecuteSigned(encodedMessage);
    expect(decoded).to.deep.eq(messageWithoutFromAndNonce);
  });

  it('message without from property shoud be equal decoded message', () => {
    const {from, ...messageWithoutFrom} = message;
    const encoded = encodeDataForExecuteSigned(message);
    const decoded = decodeDataForExecuteSigned(encoded);
    const {nonce, ...messageWithoutNonce} = messageWithoutFrom;
    expect(decoded).to.deep.eq(messageWithoutNonce);
  });
});
