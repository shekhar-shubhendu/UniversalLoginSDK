import React from 'react';
import send1x from './../../assets/illustrations/send@1x.png';
import send2x from './../../assets/illustrations/send@2x.png';
import {Link} from 'react-router-dom';
import {useServices} from '../../hooks';
const Blockies = require('react-blockies').default;

interface ModalTxnSuccessProps {
  hideModal: () => void;
}
export const ModalTxnSuccess = ({hideModal}: ModalTxnSuccessProps) => {
  const {walletPresenter} = useServices();
  return (
    <>
      <div className="box-header">
        <h1 className="box-title">Wallet creation</h1>
      </div>
      <div className="box-content modal-succes-content">
        <h3 className="modal-section-title transaction-status-title">Transaction status: success</h3>
        <img
          className="modal-avatar-succes"
          src={send1x}
          srcSet={send2x}
          alt="succes"
        />
        <div className="created-account">
          <Blockies seed={walletPresenter.getContractAddress()} size={8} scale={4} />
          <div>
            <p className="created-account-label">{walletPresenter.getName()}</p>
            <p className="created-account-hash">{walletPresenter.getContractAddress()}</p>
          </div>
        </div>
        <p className="info-text">Your wallet is ready but not secure. Go to your wallet and make sure to follow the steps to.</p>
        <Link to="/" onClick={hideModal} className="button-secondary modal-success-btn">Go to your wallet</Link>
      </div>
    </>
  );
};
