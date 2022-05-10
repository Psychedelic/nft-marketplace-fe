import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { useThemeStore, usePlugStore } from '../../../store';
import { LinkButton } from '../buttons';
import { AccordionContentMetaData } from '../../mock-data/accordion-data';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  Description,
  ButtonWrapper,
  AccordionHead,
  AccordionHeadContent,
  Flex,
  Subtext,
} from './styles';
import info from '../../../assets/accordions/info.svg';
import infoDark from '../../../assets/accordions/info-dark.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowdownDark from '../../../assets/accordions/arrow-down-dark.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import arrowupDark from '../../../assets/accordions/arrow-up-dark.svg';
import collection from '../../../assets/accordions/collection.svg';
import creator from '../../../assets/accordions/creator.svg';
import plugIcon from '../../../assets/accordions/owner.svg';

import { isNFTOwner } from '../../../integrations/kyasshu/utils';
import { formatAddress } from '../../../utils/formatters';
import {
  DiscordIcon,
  Icon,
  ShareIcon,
  TwitterIcon,
} from '../../icons';

export type AboutAccordionProps = {
  owner?: string;
};

export const AboutAccordion = ({ owner }: AboutAccordionProps) => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

  const arrowdownTheme = isLightTheme ? arrowdown : arrowdownDark;
  const arrowupTheme = isLightTheme ? arrowup : arrowupDark;

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const isOwner = isNFTOwner({
    isConnected,
    owner,
    principalId: plugPrincipal,
  });

  const AccordionHeadContentData = [
    {
      subheading: 'CAP Crowns',
      heading: 'Collection',
      image: collection,
    },
    {
      subheading: 'Psychedelic',
      heading: 'Creator',
      image: creator,
    },
    {
      subheading: isOwner
        ? `${t('translation:accordions.about.header.you')}`
        : (owner && formatAddress(owner)) || '',
      heading: 'Owner',
      image: plugIcon,
    },
  ];

  return (
    <AccordionStyle type="single" collapsible width="medium">
      <AccordionHead>
        {AccordionHeadContentData.map((data) => (
          <AccordionHeadContent key={data.heading}>
            <img src={data.image} alt={data.heading} />
            <div>
              <span>{data.heading}</span>
              <p>{data.subheading}</p>
            </div>
          </AccordionHeadContent>
        ))}
      </AccordionHead>
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          borderTop="borderSet"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div>
            <img
              src={isLightTheme ? info : infoDark}
              alt="about-collection"
            />
            <p>
              {`${t(
                'translation:accordions.about.header.aboutCrowns',
              )}`}
            </p>
          </div>
          <img
            src={!isAccordionOpen ? arrowupTheme : arrowdownTheme}
            alt="arrow-down"
          />
        </AccordionTrigger>
        <AccordionContent
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
        >
          <Description>
            {`${t(
              'translation:accordions.about.header.description',
            )}`}
          </Description>
          <div>
            {AccordionContentMetaData.map((data) => (
              <Flex key={data.title}>
                <Subtext>{data.title}</Subtext>
                <Subtext>{data.value}</Subtext>
              </Flex>
            ))}
            <ButtonWrapper>
              <LinkButton type="textBtn">
                {t('translation:buttons.links.website')}
              </LinkButton>

              <LinkButton>
                <Icon icon={DiscordIcon} />
              </LinkButton>

              <LinkButton>
                <Icon icon={TwitterIcon} />
              </LinkButton>

              <LinkButton>
                <Icon icon={ShareIcon} />
              </LinkButton>
            </ButtonWrapper>
          </div>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
