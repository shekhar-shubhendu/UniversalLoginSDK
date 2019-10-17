import React, {useState} from 'react';
import {DevicesList} from './DevicesList';
import {WalletService} from '@universal-login/sdk';
import {ConnectionNotification} from '../../Notifications/ConnectionNotification';
import {DeleteAccount} from '../DeleteAccount';
import {ConnectionSuccessNotification} from '../../Notifications/ConnectionSuccessNotification';

export interface DevicesProps {
  walletService: WalletService;
  onDeleteAccountClick: () => void;
  className?: string;
}

export type devicesContentType = 'devices' | 'approveDevice' | 'deleteAccount' | 'connectionSuccess';

export const Devices = ({walletService, onDeleteAccountClick, className}: DevicesProps) => {
  const [devicesContent, setDevicesContent] = useState<devicesContentType>('devices');
  const deployedWallet = walletService.getDeployedWallet();

  switch (devicesContent) {
    case 'devices':
      return (
        <DevicesList
          deployedWallet={deployedWallet}
          className={className}
          setDevicesContent={content => setDevicesContent(content)}
        />
      );
    case 'approveDevice':
      return (
        <ConnectionNotification
          onConnectionSuccess={() => setDevicesContent('connectionSuccess')}
          deployedWallet={deployedWallet}
          onDenyRequests={() => setDevicesContent('devices')}
          className={className}
        />
      );
    case 'connectionSuccess':
      return (
        <ConnectionSuccessNotification onClose={() => setDevicesContent('devices')} className={className} />
      );
    case 'deleteAccount':
      return (
        <DeleteAccount
          walletService={walletService}
          onDeleteAccountClick={() => onDeleteAccountClick()}
          onCancelClick={() => setDevicesContent('devices')}
          className={className}
        />
      );
    default:
      return null;
  }
};
