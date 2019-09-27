import React, {useState} from 'react';
import {TransferDropdown} from './TransferDropdown';
import UniversalLoginSDK, {getTransactionFee} from '@universal-login/sdk';
import {TransferDetails, TokenDetailsWithBalance, getBalanceOf, ApplicationWallet, waitUntil} from '@universal-login/commons';
import './../../styles/transferAmount.css';
import './../../styles/transferAmountDefaults.css';
import {getStyleForTopLevelComponent} from '../../../core/utils/getStyleForTopLevelComponent';
import {useAsyncEffect} from '../../hooks/useAsyncEffect';
import {utils} from 'ethers';

export interface TransferAmountProps {
  sdk: UniversalLoginSDK;
  applicationWallet: ApplicationWallet;
  transferDetails: TransferDetails;
  onSelectRecipientClick: () => void;
  updateTransferDetailsWith: (transferDetails: Partial<TransferDetails>) => void;
  currency: string;
  transferAmountClassName?: string;
}

export const TransferAmount = ({sdk, applicationWallet, transferDetails, onSelectRecipientClick, updateTransferDetailsWith, currency, transferAmountClassName}: TransferAmountProps) => {
  const amount = transferDetails.amount;

  const [tokenDetailsWithBalance, setTokenDetailsWithBalance] = useState<TokenDetailsWithBalance[]>([]);
  useAsyncEffect(() => sdk.subscribeToBalances(applicationWallet.name, setTokenDetailsWithBalance), []);

  const balance = getBalanceOf(currency, tokenDetailsWithBalance);

  const onClickMaxAmount = async () => {
    await waitUntil(() => !!balance);
    if (utils.parseEther(balance!).eq(0)) {
      updateTransferDetailsWith({amount: '0'});
    } else {
      const transactionFee = await getTransactionFee(sdk, applicationWallet, {...transferDetails, amount: balance!});
      const amountMinusFee = (utils.parseEther(balance!)).sub(transactionFee!);
      if (amountMinusFee!.lte(0)) {
        updateTransferDetailsWith({amount: '0'});
      }
      updateTransferDetailsWith({amount: utils.formatEther(amountMinusFee.toString())});
    }
  };

  const isAmountCorrect = balance && amount && amount <= balance || false;

  return (
    <div className="universal-login-amount">
    <div className={getStyleForTopLevelComponent(transferAmountClassName)}>
      <div className="transfer-amount">
        <TransferDropdown
          sdk={sdk}
          tokenDetailsWithBalance={tokenDetailsWithBalance}
          currency={currency}
          setCurrency={(currency: string) => updateTransferDetailsWith({currency})}
          className={transferAmountClassName}
        />
        <div className="transfer-amount-row">
          <label className="transfer-amount-label" htmlFor="amount-eth">How much are you sending?</label>
          <button id="max-button" className="transfer-amount-max" onClick={() => onClickMaxAmount()}>Max</button>
        </div>
        <div className="transfer-amount-input-wrapper">
          <input
            id="amount-eth"
            type="number"
            className="transfer-amount-input"
            onChange={event => updateTransferDetailsWith({amount: event.target.value})}
            value={amount || ''}
          />
          <span className="transfer-amount-code">{currency}</span>
        </div>
        <button id="select-recipient" onClick={onSelectRecipientClick} className="transfer-amount-btn" disabled={!isAmountCorrect}>
          <span>Select recipient</span>
        </button>
      </div>
    </div>
  </div>
  );
};
