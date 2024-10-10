import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSingleEpisode } from "@/hooks/useSingleEpisode";
import { useCharacter } from "@/hooks/useCharacter";
import { TCharacter } from "@/types/allTypes";

const Episode = () => {
  const { id } = useParams();
  const { data: episode, isLoading: isEpisodeLoading } = useSingleEpisode({
    id: Number(id),
  });
  const charactersArray = Array.isArray(episode?.characters)
    ? episode?.characters?.map((char) => Number(char.split("/").pop()))
    : [];
  const { data: characters, isLoading: isCharacterLoading } = useCharacter({
    id: charactersArray,
  });
  const allCharacters = characters as TCharacter[];

  if (isEpisodeLoading || isCharacterLoading) return <div>Loading...</div>;
  return (
    <div className="flex-col">
      {episode?.name}

      {allCharacters?.map((char) => (
        <div key={char.id}>
          <Link to={`/characters/${char.id}`}>{char.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Episode;
