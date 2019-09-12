import {Provider} from 'web3/providers';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {ULWeb3Provider} from '../lib/index';
import {JsonRPCResponse, Callback} from '../lib/models/rpc';
import Web3 from 'web3';

chai.use(sinonChai);

describe('ULWeb3Provider.send', () => {
  let ulWeb3Provider: ULWeb3Provider;
  let web3Provider: Provider;
  let callback: Callback<JsonRPCResponse>;

  beforeEach(() => {
    web3Provider = sinon.spy() as any;
    // ulWeb3Provider = new ULWeb3Provider(web3Provider, '', []);
    // const universalLogin = new ULWeb3Provider(
    //   new Web3.providers.HttpProvider(''),
    //   '',
    //   [],
    // );
  });

  it('sends', () => {
//     ulWeb3Provider.send({
//       jsonrpc: '2.0',
//       method: 'eth_sendTransaction',
//       params: [],
//       id: 1
//     }, callback);
//     expect(callback).to.have.been.calledWith({});
//     expect(web3Provider).to.have.been.calledWith({});
  });
});
