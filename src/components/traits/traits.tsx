import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../icons';
import { EditTraitsModal } from '../modals';
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
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = indexableTraits[0].traitList.length;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.style.transition = 'all 0.2s ease-in-out';
      ref.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  const nextSlide = (id: number) => {
    if (currentSlide >= totalSlides) return;
    else setCurrentSlide(currentSlide + 1);
  };

  const previousSlide = (id: number) => {
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
        <EditTraitsModal />
      </Flex>
      <SectionWrapper>
        <HeadingText type="title" size="md">
          {t('translation:traits.indexableTraits')}
        </HeadingText>
        {indexableTraits.map((item) => (
          <div>
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
            <>
              <CarouselContainer>
                <CarouselArrow
                  direction="left"
                  onClick={() => previousSlide(item.id)}
                >
                  <Icon icon="chevronLeft" size="lg" />
                </CarouselArrow>
                <CarouselWrapper>
                  <CarouselInnerWrapper ref={ref}>
                    {item.traitList.map((trait) => (
                      <>
                        <CarouselItem>
                          <CarouselName>{trait.name}</CarouselName>
                          <CarouselDescription>
                            {trait.description}
                          </CarouselDescription>
                          <CarouselRarity>
                            {trait.rarity}
                          </CarouselRarity>
                        </CarouselItem>
                      </>
                    ))}
                  </CarouselInnerWrapper>
                </CarouselWrapper>
                <CarouselArrow
                  direction="right"
                  onClick={() => nextSlide(item.id)}
                >
                  <Icon icon="chevronRight" size="lg" />
                </CarouselArrow>
              </CarouselContainer>
            </>
          </div>
        ))}
      </SectionWrapper>
      <SectionWrapper>
        <HeadingText type="title" size="md">
          Non-indexable Traits
        </HeadingText>
        {nonIndexableTraits.map((item) => (
          <div>
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
            <>
              <CarouselContainer>
                <CarouselArrow
                  direction="left"
                  onClick={() => previousSlide(item.id)}
                >
                  <Icon icon="chevronLeft" size="lg" />
                </CarouselArrow>
                <CarouselWrapper>
                  <CarouselInnerWrapper ref={ref}>
                    {item.traitList.map((trait) => (
                      <>
                        <CarouselItem>
                          <CarouselName>{trait.name}</CarouselName>
                          <CarouselDescription>
                            {trait.description}
                          </CarouselDescription>
                          <CarouselRarity>
                            {trait.rarity}
                          </CarouselRarity>
                        </CarouselItem>
                      </>
                    ))}
                  </CarouselInnerWrapper>
                </CarouselWrapper>
                <CarouselArrow
                  direction="right"
                  onClick={() => nextSlide(item.id)}
                >
                  <Icon icon="chevronRight" size="lg" />
                </CarouselArrow>
              </CarouselContainer>
            </>
          </div>
        ))}
      </SectionWrapper>
    </TraitsContainer>
  );
};

export default Traits;

const indexableTraits = [
  {
    sectionName: 'Background',
    id: 1,
    traitList: [
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
    ],
  },
  {
    sectionName: 'Head Item',
    id: 2,
    traitList: [
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
    ],
  },
  {
    sectionName: 'Facial Expression',
    id: 2,
    traitList: [
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
    ],
  },
  {
    sectionName: 'Shoes',
    id: 2,
    traitList: [
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
    ],
  },
  {
    sectionName: 'Speed',
    id: 2,
    traitList: [
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
    ],
  },
  {
    sectionName: 'Bling',
    id: 2,
    traitList: [
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
    ],
  },
];

const nonIndexableTraits = [
  {
    sectionName: 'ID',
    id: 1,
    traitList: [
      {
        name: 'ID',
        description: 'CDB-1.0.654',
        rarity: '420 (4.20%)',
      },
      {
        name: 'ID',
        description: 'CDB-1.0.654',
        rarity: '420 (4.20%)',
      },
      {
        name: 'ID',
        description: 'CDB-1.0.654',
        rarity: '420 (4.20%)',
      },
      {
        name: 'ID',
        description: 'CDB-1.0.654',
        rarity: '420 (4.20%)',
      },
    ],
  },
  {
    sectionName: 'Rarity',
    id: 2,
    traitList: [
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
    ],
  },
];
