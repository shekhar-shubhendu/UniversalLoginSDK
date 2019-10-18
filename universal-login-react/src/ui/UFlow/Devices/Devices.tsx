import React, {useState} from 'react';
import {DevicesList} from './DevicesList';
import {DeployedWallet} from '@universal-login/sdk';
import {ConnectionNotification} from '../../Notifications/ConnectionNotification';
import {DeleteAccount} from '../DeleteAccount';
import {ConnectionSuccessNotification} from '../../Notifications/ConnectionSuccessNotification';

export interface DevicesProps {
  deployedWallet: DeployedWallet;
  onDeleteAccountClick: () => void;
  className?: string;
}

export type devicesContentType = 'devices' | 'approveDevice' | 'deleteAccount' | 'connectionSuccess';

export const Devices = ({deployedWallet, onDeleteAccountClick, className}: DevicesProps) => {
  const [devicesContent, setDevicesContent] = useState<devicesContentType>('devices');

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
          deployedWallet={deployedWallet}
          onDeleteAccountClick={() => onDeleteAccountClick()}
          onCancelClick={() => setDevicesContent('devices')}
          className={className}
        />
      );
    default:
      return null;
  }
};
