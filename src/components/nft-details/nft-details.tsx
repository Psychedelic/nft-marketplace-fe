import React from 'react';
import {
  OfferAccordion,
  AboutAccordion,
  NFTTraitsChip,
} from '../core';
import { NFTMetaData } from '../nft-metadata';
import NFTImage from '../../assets/nft-preview.svg';
import {
  Container,
  PreviewContainer,
  NFTPreview,
  NFTTraitsContainer,
  DetailsContainer,
} from './styles';

export const NftDetails = () => (
  <Container>
    <PreviewContainer>
      <NFTPreview src={NFTImage} alt="NFTImage" />
      <NFTTraitsContainer>
        <NFTTraitsChip name="Crystal" rimValue="420 (4.20%)" />
        <NFTTraitsChip name="Crystal" rimValue="420 (4.20%)" />
        <NFTTraitsChip name="Crystal" rimValue="420 (4.20%)" />
      </NFTTraitsContainer>
    </PreviewContainer>
    <DetailsContainer>
      <NFTMetaData />
      <OfferAccordion />
      <AboutAccordion owned />
    </DetailsContainer>
  </Container>
);
