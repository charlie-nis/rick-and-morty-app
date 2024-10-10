import { TCharacter, TCharacterResponse, TInfo } from "@/types/allTypes";

export const mapCharacterResponse = (
  response: TCharacterResponse | null | undefined
) => {
  if (!response) {
    return {
      info: null,
      results: [],
    };
  }

  const mappedInfo = mapInfo(response.info);
  const mappedResults = (
    Array.isArray(response.results) ? response.results : []
  ).map(mapCharacter);

  return {
    info: mappedInfo,
    results: mappedResults,
  };
};

const mapInfo = (info: TInfo | null | undefined) => {
  if (!info) {
    return {
      totalCharacters: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  return {
    totalCharacters: info.count ?? 0,
    totalPages: info.pages ?? 0,
    hasNextPage: !!info.next,
    hasPreviousPage: !!info.prev,
  };
};

const mapCharacter = (character: TCharacter | null | undefined) => {
  if (!character) {
    return {
      characterId: null,
      characterName: "Unknown",
      characterStatus: "Unknown",
      characterSpecies: "Unknown",
      characterGender: "Unknown",
      characterImage: "",
      originLocation: {
        name: "Unknown",
        url: "",
      },
      lastKnownLocation: {
        name: "Unknown",
        url: "",
      },
      episodeCount: 0,
      creationDate: "Unknown",
    };
  }

  return {
    characterId: character.id ?? null,
    characterName: character.name ?? "Unknown",
    characterStatus: character.status ?? "Unknown",
    characterSpecies: character.species ?? "Unknown",
    characterGender: character.gender ?? "Unknown",
    characterImage: character.image ?? "",
    originLocation: {
      name: character.origin?.name ?? "Unknown",
      url: character.origin?.url ?? "",
    },
    lastKnownLocation: {
      name: character.location?.name ?? "Unknown",
      url: character.location?.url ?? "",
    },
    episodeCount: character.episode?.length ?? 0,
    creationDate: character.created ?? "Unknown",
  };
};
