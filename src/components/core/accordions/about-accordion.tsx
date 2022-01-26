import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { LinkButton } from '../buttons';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  Description,
  MetaDataWrapper,
  ButtonWrapper,
  AccordionHead,
  AccordionHeadContent,
} from './styles';
import info from '../../../assets/accordions/info.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import discord from '../../../assets/buttons/discord.svg';
import twitter from '../../../assets/buttons/twitter.svg';
import back from '../../../assets/buttons/back.svg';
import collection from '../../../assets/accordions/collection.svg';
import creator from '../../../assets/accordions/creator.svg';
import owner from '../../../assets/accordions/owner.svg';

export const AboutAccordion = () => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <AccordionStyle
      type="single"
      defaultValue="item-1"
      collapsible
      width="medium"
    >
      <AccordionHead>
        <AccordionHeadContent>
          <img src={collection} alt="collection" />
          <div>
            <span>Collection</span>
            <p>CAP Crowns</p>
          </div>
        </AccordionHeadContent>
        <AccordionHeadContent>
          <img src={creator} alt="creator" />
          <div>
            <span>Creator</span>
            <p>Psychedelic</p>
          </div>
        </AccordionHeadContent>
        <AccordionHeadContent>
          <img src={owner} alt="owner" />
          <div>
            <span>Owner</span>
            <p>You</p>
          </div>
        </AccordionHeadContent>
      </AccordionHead>
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          borderTop="borderSet"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div>
            <img src={info} alt="about-collection" />
            <p>About Crowns</p>
          </div>
          <img src={!isAccordionOpen ? arrowup : arrowdown} alt="arrow-down" />
        </AccordionTrigger>
        <AccordionContent padding="medium">
          <Description>
            Crowns are a collection of 10,000 uniquely generated NFTs on the
            Internet Computer. With a mix of traditional and psychedelic
            materials.
          </Description>
          <MetaDataWrapper>
            <div>
              <p>Canister ID</p>
              <p>t7wg4-tyaaa-aaaak-qacaa-cai</p>
            </div>
            <div>
              <p>Token Standard</p>
              <p>DIP20</p>
            </div>
            <div>
              <p>Token ID</p>
              <p>2713</p>
            </div>
            <div>
              <p>Blockchain</p>
              <p>Internet Computer</p>
            </div>
            <ButtonWrapper>
              <LinkButton outline="light" text="bold">
                {t('translation:buttons.links.website')}
              </LinkButton>
              &nbsp;
              <LinkButton outline="light" text="bold" padding="narrow">
                <img
                  src={discord}
                  alt={t('translation:buttons.links.discord')}
                />
              </LinkButton>
              &nbsp;
              <LinkButton outline="light" text="bold" padding="narrow">
                <img
                  src={twitter}
                  alt={t('translation:buttons.links.twitter')}
                />
              </LinkButton>
              &nbsp;
              <LinkButton outline="light" text="bold" padding="narrow">
                <img src={back} alt={t('translation:buttons.links.back')} />
              </LinkButton>
            </ButtonWrapper>
          </MetaDataWrapper>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
