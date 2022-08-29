import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../icons';
import {
  HeadingText,
  Flex,
  EditIconWrapper,
  EditIcon,
  TraitsContainer,
  SectionWrapper,
  CarouselContainer,
  CarouselArrow,
  CarouselWrapper,
  CarouselInnerWrapper,
  CarouselItem,
  CarouselName,
  CarouselDescription,
  CarouselRarity,
} from './styles';

const Traits = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = items.length;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.style.transition = 'all 0.2s ease-in-out';
      ref.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide >= totalSlides) return;
    else setCurrentSlide(currentSlide + 1);
  };

  const previousSlide = () => {
    if (currentSlide === 0) return;
    else setCurrentSlide(currentSlide - 1);
  };

  return (
    <TraitsContainer>
      <Flex>
        <div>
          <HeadingText type="title" width="sm">
            {t('translation:traits.traits')}
          </HeadingText>
          <HeadingText size="sm" width="sm">
            {t('translation:traits.traitsDescription')}
          </HeadingText>
        </div>
        <EditIconWrapper>
          <EditIcon icon="pen" size="md" />
        </EditIconWrapper>
      </Flex>
      <SectionWrapper>
        <HeadingText type="title" size="md">
          {t('translation:traits.indexableTraits')}
        </HeadingText>
        <Flex width="full">
          <HeadingText
            size="xs"
            type="title"
            spacing="top"
            width="unset"
          >
            {t('translation:traits.background')}
          </HeadingText>
          <HeadingText size="xs" width="unset">
            5 {t('translation:traits.variants')}
          </HeadingText>
        </Flex>

        <>
          <CarouselContainer>
            <CarouselArrow direction="left" onClick={previousSlide}>
              <Icon icon="chevronLeft" size="lg" />
            </CarouselArrow>
            <CarouselWrapper>
              <CarouselInnerWrapper ref={ref}>
                {items.map((trait) => (
                  <>
                    <CarouselItem>
                      <CarouselName>{trait.name}</CarouselName>
                      <CarouselDescription>
                        {trait.description}
                      </CarouselDescription>
                      <CarouselRarity>{trait.rarity}</CarouselRarity>
                    </CarouselItem>
                  </>
                ))}
              </CarouselInnerWrapper>
            </CarouselWrapper>
            <CarouselArrow direction="right" onClick={nextSlide}>
              <Icon icon="chevronRight" size="lg" />
            </CarouselArrow>
          </CarouselContainer>
        </>
      </SectionWrapper>
      {/* Non-indexable Traits */}
      <div></div>
    </TraitsContainer>
  );
};

export default Traits;

const items = [
  {
    name: 'Background',
    description: 'Gradient R-Y',
    rarity: '420 (4.20%)',
  },
  {
    name: 'Background',
    description: 'Gradient R-Y',
    rarity: '420 (4.20%)',
  },
  {
    name: 'Background',
    description: 'Gradient R-Y',
    rarity: '420 (4.20%)',
  },
  {
    name: 'Background',
    description: 'Gradient R-Y',
    rarity: '420 (4.20%)',
  },
  {
    name: 'Background',
    description: 'Gradient R-Y',
    rarity: '420 (4.20%)',
  },
  {
    name: 'Background',
    description: 'Gradient R-Y',
    rarity: '420 (4.20%)',
  },
];
