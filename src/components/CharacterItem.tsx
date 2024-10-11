import React from "react";
import { Link } from "react-router-dom";
import { TCharacter } from "@/types/allTypes";

type TProps = {
  character: TCharacter;
};

const CharacterItem: React.FC<TProps> = ({ character }) => {
  return (
    <div className="rounded-lg bg-zinc-600 text-white overflow-hidden mb-4">
      <Link
        to={`/characters/${character.id}`}
        className="flex flex-col md:flex-row text-white hover:opacity-75"
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-52 md:w-52 md:h-52 rounded-t-lg md:rounded-l-lg object-cover"
        />
        <div className="px-4 py-5 flex flex-col text-sm gap-y-4 flex-grow">
          <div className="gap-y-1">
            <div className="text-lg md:text-xl font-bold">{character.name}</div>
            <div className="flex flex-row gap-2 items-center">
              <div
                className={
                  character.status === "Alive"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                &#9679;
              </div>
              {`${character.status} - ${character.species}`}
            </div>
          </div>
          <div className="gap-y-1">
            <div className="text-zinc-400">Location:</div>
            <div className="text-zinc-200 text-lg">
              {character?.location?.name}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterItem;
