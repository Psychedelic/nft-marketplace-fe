import { useTranslation } from 'react-i18next';
import {
  EditIndexableTraitsModal,
  EditNonIndexableTraitsModal,
} from '../modals';
import CarouselSlider from './carousel-slider';
import {
  HeadingText,
  Flex,
  TraitsContainer,
  SectionWrapper,
} from './styles';
import {
  indexableTraits,
  nonIndexableTraits,
} from './traits-dummy-data';

const Traits = () => {
  const { t } = useTranslation();

  return (
    <TraitsContainer>
      <div>
        <HeadingText type="title" width="sm">
          {t('translation:traits.traits')}
        </HeadingText>
        <HeadingText size="sm">
          {t('translation:traits.traitsDescription')}
        </HeadingText>
      </div>
      <SectionWrapper>
        <HeadingText type="title" size="md">
          {t('translation:traits.indexableTraits')}
        </HeadingText>
        <Flex alignItems="flexStart">
          <div>
            <HeadingText size="sm" width="sm">
              {t('translation:traits.indexableTraitsDescription')}
            </HeadingText>
          </div>
          <EditIndexableTraitsModal />
        </Flex>
        {indexableTraits.map((item) => (
          <div key={item.id}>
            <Flex width="full">
              <HeadingText
                size="xs"
                type="title"
                spacing="top"
                width="unset"
              >
                {item.sectionName}
              </HeadingText>
              <HeadingText size="xs" width="unset">
                5 {t('translation:traits.variants')}
              </HeadingText>
            </Flex>
            <CarouselSlider item={item} />
          </div>
        ))}
      </SectionWrapper>

      <SectionWrapper>
        <HeadingText type="title" size="md">
          {t('translation:traits.nonIndexableTraits')}
        </HeadingText>
        <Flex alignItems="flexStart">
          <div>
            <HeadingText size="sm" width="sm">
              {t('translation:traits.nonIndexableTraitsDescription')}
            </HeadingText>
          </div>
          <EditNonIndexableTraitsModal />
        </Flex>
        {nonIndexableTraits.map((item) => (
          <div key={item.id}>
            <Flex width="full">
              <HeadingText
                size="xs"
                type="title"
                spacing="top"
                width="unset"
              >
                {item.sectionName}
              </HeadingText>
              <HeadingText size="xs" width="unset">
                10,000 {t('translation:traits.variants')}
              </HeadingText>
            </Flex>
            <CarouselSlider item={item} />
          </div>
        ))}
      </SectionWrapper>
    </TraitsContainer>
  );
};

export default Traits;
