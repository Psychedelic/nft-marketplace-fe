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
import miniDfinity from '../../../assets/mini-dfinity.svg';
import nftcard from '../../../assets/nft-card-image.svg';

export type NftCardProps = {
  owned?: boolean;
  notForSale?: boolean;
  forSaleAndOffer?: boolean;
  forSale?: boolean;
};

export const NftCard = ({
  owned,
  notForSale,
  forSaleAndOffer,
  forSale,
}: NftCardProps) => (
  <CardWrapper>
    <Flex>
      <OwnedCardText>{owned ? 'Owned' : ''}</OwnedCardText>
      <CardOptionsDropdown />
    </Flex>
    <Image>
      <img src={nftcard} alt="nft-card" />
    </Image>
    <Flex>
      <NftName>Cap Crowns</NftName>
      {notForSale ? (
        ''
      ) : (
        <Dfinity>
          21.12
          <img src={miniDfinity} alt="" />
        </Dfinity>
      )}
    </Flex>

    <Flex>
      <NftId>2713</NftId>
      {notForSale ? (
        ''
      ) : (
        <LastOffer>
          {forSaleAndOffer ? 'Offer for' : 'Last'}
          <b> 4.28</b>
        </LastOffer>
      )}
    </Flex>
  </CardWrapper>
);
