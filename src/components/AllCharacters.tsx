import React from "react";
import { useCharacter } from "@/hooks/useCharacter";
import { TCharacter } from "@/types/allTypes";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

type Props = {
  characterArray: number[] | undefined;
};

const AllCharacters: React.FC<Props> = ({ characterArray }) => {
  const { data: characters, isLoading: isCharacterLoading } = useCharacter({
    id: characterArray,
  });

  if (isCharacterLoading || isEmpty(characterArray)) return null;

  const allCharacters = Array.isArray(characters)
    ? (characters as TCharacter[])
    : [characters as TCharacter];

  return (
    <>
      <div className="flex flex-col rounded-lg bg-zinc-600  text-white mt-6 p-6 gap-6 ">
        <div className="text-zinc-400">Residents:</div>
        <div className="flex flex-row gap-4 flex-wrap   ">
          {allCharacters?.map((char) => (
            <Link
              to={`/characters/${char.id}`}
              key={char.id}
              className="w-24 h-24 relative group"
            >
              <img
                src={char.image}
                alt={char.name}
                className="flex rounded-lg  w-full h-full object-cover"
              />
              <div className="absolute rounded-lg  inset-0 bg-red-500 opacity-0 hover:opacity-35 transition duration-300"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max rounded-md bg-red-700 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {char.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCharacters;
