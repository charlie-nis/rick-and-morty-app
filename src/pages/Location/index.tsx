import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSingleLocation } from "@/hooks/useSingleLocation";
import { useCharacter } from "@/hooks/useCharacter";
import { TCharacter } from "@/types/allTypes";

const Location = () => {
  const { id } = useParams();
  const { data: location, isLoading: isLocationLoading } = useSingleLocation({
    id: Number(id),
  });
  const residents = Array.isArray(location?.residents)
    ? location?.residents?.map((resident) => Number(resident.split("/").pop()))
    : [];
  const { data: characters, isLoading: isCharacterLoading } = useCharacter({
    id: residents,
  });
  const allCharacters = characters as TCharacter[];

  if (isLocationLoading || isCharacterLoading) return <div>Loading...</div>;
  return (
    <div className="flex-col">
      {location?.name}

      {allCharacters?.map((char) => (
        <div key={char.id}>
          <Link to={`/characters/${char.id}`}>{char.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Location;
