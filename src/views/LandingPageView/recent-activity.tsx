import React from 'react';
import { Link } from 'react-router-dom';
import {
  RecentActivity,
  RecentActivityText,
  RecentActivityCrownName,
  RecentActivityAmountSold,
  TransactionIcon,
} from './styles';
import { parseE8SAmountToWICP } from '../../utils/formatters';
import { formatTimestamp } from '../../integrations/functions/date';

type RecentActivitiesProps = {
  icon: any;
  id: number;
  name: string;
  price: bigint;
  time: string;
  description: string;
  latestActiveToken?: any;
  collectionId: string;
};

const RecentActivities = ({
  icon,
  id,
  name,
  price,
  time,
  description,
  latestActiveToken,
  collectionId,
}: RecentActivitiesProps) => {
  return (
    <RecentActivity>
      <TransactionIcon
        icon={icon}
        size="sm"
        isOffer={latestActiveToken?.offers && true}
      />
      {latestActiveToken?.offers && description}
      <RecentActivityText>
        <Link to={`/${collectionId}/nft/${id}`}>
          <RecentActivityCrownName>
            {name} #{id}
          </RecentActivityCrownName>
        </Link>
        {!latestActiveToken?.offers && description}
        {!latestActiveToken?.offers && (
          <RecentActivityAmountSold>
            {parseE8SAmountToWICP(price)} WICP
          </RecentActivityAmountSold>
        )}
        {formatTimestamp(BigInt(time))}
      </RecentActivityText>
    </RecentActivity>
  );
};

export default RecentActivities;
