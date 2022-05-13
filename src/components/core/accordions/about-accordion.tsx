import React, { useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { useAppDispatch, usePlugStore } from '../../../store';
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
  AccordionImage,
} from './styles';
import plugIcon from '../../../assets/plug-circle.svg';

import { isNFTOwner } from '../../../integrations/kyasshu/utils';
import { formatAddress } from '../../../utils/formatters';
import { Icon } from '../../icons';
import { notificationActions } from '../../../store/features/notifications';

export type AboutAccordionProps = {
  owner?: string;
};

export const AboutAccordion = ({ owner }: AboutAccordionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

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
      // TODO: replace with collection url after integration is done
      image:
        'https://storageapi2.fleek.co/fleek-team-bucket/logos/crowns-ooo.png',
    },
    {
      subheading: 'Psychedelic',
      heading: 'Creator',
      // TODO: replace with creator url after integration is done
      image: 'https://psychedelic.ooo/images/11-2.svg',
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
            <AccordionImage
              style={{ backgroundImage: `url(${data.image})` }}
            />
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
            <Icon icon="info" paddingRight />
            <p>
              {`${t(
                'translation:accordions.about.header.aboutCrowns',
              )}`}
            </p>
          </div>
          <Icon icon="chevron-down" rotate={isAccordionOpen} />
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
              <LinkButton type="textBtn" url="https://crowns.ooo/">
                {t('translation:buttons.links.website')}
              </LinkButton>

              <LinkButton url="https://discord.gg/yVEcEzmrgm">
                <Icon icon="discord" />
              </LinkButton>

              <LinkButton url="https://twitter.com/cap_ois">
                <Icon icon="twitter" />
              </LinkButton>

              <LinkButton
                handleClick={() => {
                  copyToClipboard(window.location.href);
                  dispatch(
                    notificationActions.setSuccessMessage(
                      `${t(
                        'translation:successMessages.copyToClipboard',
                      )}`,
                    ),
                  );
                }}
              >
                <Icon icon="share" />
              </LinkButton>
            </ButtonWrapper>
          </div>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
