export type TResourceBase = {
  id: number;
  name: string;
  url: string;
  created: string;
};

export type TInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type TCharacterOrigin = {
  name: string;
  url: string;
};

export type TCharacterLocation = TResourceBase & {
  name: string;
  url: string;
};

export type TCharacter = TResourceBase & {
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: TCharacterOrigin;
  location: TCharacterLocation;
  image: string;
  episode: string[];
};

export type TCharacterResponse = {
  info: TInfo;
  results: TCharacter[];
};

export type TLocation = TResourceBase & {
  type: string;
  dimension: string;
  residents: string[];
};

export type TEpisode = TResourceBase & {
  air_date: string;
  episode: string;
  characters: string[];
};
