import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacter";
import { TCharacter } from "@/types/allTypes";

const Character = () => {
  const { id } = useParams();

  const { data } = useCharacter({ id: Number(id) });
  // console.log(data);

  const character = data as TCharacter;

  const Episode: React.FC<{ url: string }> = ({ url }) => {
    const epNumber = url.split("/").pop() || "";
    return (
      <div className="flex row">
        <Link to={`/episode/${epNumber}`}>{epNumber}</Link>
      </div>
    );
  };

  return (
    <div className="flex-col">
      <Link to={`/location/${character?.location?.url.split("/").pop() || ""}`}>
        {character?.location?.name}
      </Link>
      {character?.episode?.map((ep) => (
        <Episode key={ep} url={ep} />
      ))}
    </div>
  );
};
export default Character;
