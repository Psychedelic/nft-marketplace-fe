export type Trait = {
  value?: string;
  occurance?: number;
  rarity?: number;
};

export const parseTraits = (traits: Trait[]) => {
  return traits.filter((trait) => trait?.value);
};
