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
  Video,
} from './styles';

export const NftDetails = () => (
  <Container>
    <PreviewContainer>
      {/* <NFTPreview src={NFTImage} alt="NFTImage" /> */}
      <Video
        loop
        autoPlay
        muted
        preload="metadata"
        controls={false}
        poster="/assets/random-crown.png"
      >
        <source
          src="https://vqcq7-gqaaa-aaaam-qaara-cai.raw.ic0.app/9791.mp4"
          type="video/mp4"
        />
      </Video>
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
