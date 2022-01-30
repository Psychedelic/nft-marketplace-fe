import React from 'react';
import { CardOptionsDropdown } from '../dropdown';
import {
  CardWrapper,
  Flex,
  OwnedCardText,
  NftName,
  NftId,
  LastOffer,
  Dfinity,
  Image,
} from './styles';

export type NftCardProps = {
  owned?: boolean;
  notForSale?: boolean;
  forSaleAndOffer?: boolean;
  forSale?: boolean;
  data?;
};

export const NftCard = ({
  owned,
  notForSale,
  forSaleAndOffer,
  data,
}: NftCardProps) => (
  <CardWrapper>
    <Flex>
      <OwnedCardText>{owned ? 'Owned' : ''}</OwnedCardText>
      <CardOptionsDropdown />
    </Flex>
    <Image>
      <img src={data?.nftImage} alt="nft-card" />
    </Image>
    <Flex>
      <NftName>{data?.nftName}</NftName>
      {notForSale ? (
        ''
      ) : (
        <Dfinity>
          {data?.dfinityValue}
          <img src={data?.dfintiyIcon} alt="" />
        </Dfinity>
      )}
    </Flex>

    <Flex>
      <NftId>{data?.nftId}</NftId>
      {notForSale ? (
        ''
      ) : (
        <LastOffer>
          {forSaleAndOffer ? 'Offer for ' : 'Last '}
          <b>
            {data?.lastOffer}
          </b>
        </LastOffer>
      )}
    </Flex>
  </CardWrapper>
);
