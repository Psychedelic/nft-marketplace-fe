import React, { useState, useEffect } from 'react';
import { SkeletonBox } from '../skeleton';
import { TextLinkDetails } from './styles';
import { getICNSName, formatICNSName } from '../../../utils/icns';
import { AppLog } from '../../../utils/log';
import { NameTooltip } from '../tooltip';

export interface TextLinkCellProps {
  text?: string;
  url?: string;
  type: any;
  principalId?: string;
}

export const TextLinkCell = ({
  text,
  type,
  url,
  principalId,
}: TextLinkCellProps) => {
  const [icnsName, setICNSName] = useState<string>('');
  const [icnsNameLoadingStatus, setICNSNameLoadingStatus] =
    useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (!principalId) {
        setICNSNameLoadingStatus(false);

        return;
      }

      setICNSNameLoadingStatus(true);

      try {
        const icnsName = await getICNSName(principalId);

        setICNSName(icnsName);
        setICNSNameLoadingStatus(false);
      } catch (error) {
        setICNSNameLoadingStatus(false);
        AppLog.error(error);
      }
    })();
  }, [principalId]);

  if (icnsNameLoadingStatus) {
    return <SkeletonBox />;
  }

  if (icnsName) {
    return (
      <TextLinkDetails type={type} href={url} target="_blank">
        <NameTooltip name={icnsName} />
      </TextLinkDetails>
    );
  }

  return (
    <TextLinkDetails
      type={type}
      href={url}
      center={text === '-' || !text ? true : false}
      target="_blank"
    >
      {text ? text : '-'}
    </TextLinkDetails>
  );
};
