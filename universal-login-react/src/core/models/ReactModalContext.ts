import React from 'react';
import {OnGasParametersChanged} from '@universal-login/commons';
import {IModalService} from '../services/createModalService';
import UniversalLoginSDK, {WalletService} from '@universal-login/sdk';
import {WaitingForTransactionProps, WaitingForOnRampProviderProps} from '../../ui/commons/WaitingFor';

export type ReactModalType = 'connectionFlow' | 'topUpAccount' | 'topUp' | 'address' | 'waitingFor' | 'safello' | 'waitingForOnRampProvider';

export type ReactModalProps = TopUpProps | WaitingForTransactionProps  | ConnectionFlowProps | WaitingForOnRampProviderProps;

export type ConnectionFlowProps = {
  name: string;
  sdk: UniversalLoginSDK;
  walletService: WalletService;
  onSuccess: () => void;
};

export type TopUpProps = {
  sdk: UniversalLoginSDK
  contractAddress: string;
  onGasParametersChanged?: OnGasParametersChanged;
  isDeployment: boolean;
};

export const ReactModalContext = React.createContext({} as IModalService<ReactModalType, ReactModalProps>);
