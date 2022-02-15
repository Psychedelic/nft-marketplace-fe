import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { LinkButton } from '../buttons';
import {
  AccordionContentMetaData,
  Buttons,
} from '../../mock-data/accordion-data';
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
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import collection from '../../../assets/accordions/collection.svg';
import creator from '../../../assets/accordions/creator.svg';
import owner from '../../../assets/accordions/owner.svg';

export type AboutAccordionProps = {
  owned: boolean;
};

export const AboutAccordion = ({ owned }: AboutAccordionProps) => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

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
      subheading: owned ? 'You' : 'rgblt...whfy',
      heading: 'Owner',
      image: owner,
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
            <img src={info} alt="about-collection" />
            <p>
              {`${t(
                'translation:accordions.about.header.aboutCrowns',
              )}`}
            </p>
          </div>
          <img
            src={!isAccordionOpen ? arrowup : arrowdown}
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
              &nbsp;
              {Buttons.map((button) => (
                <LinkButton key={button.alt}>
                  <img src={button.image} alt={button.image} />
                </LinkButton>
              ))}
              &nbsp;
            </ButtonWrapper>
          </div>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
