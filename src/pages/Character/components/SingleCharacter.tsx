import React from "react";
import { Link } from "react-router-dom";
import { TCharacter } from "@/types/allTypes";
import { isEmpty } from "lodash";

type TProps = {
  character: TCharacter;
};

const Episode: React.FC<{ url: string }> = ({ url }) => {
  const epNumber = url.split("/").pop() || "";
  return (
    <Link
      to={`/episode/${epNumber}`}
      className="flex text-white rounded-lg p-2 border w-16 h-12 justify-center hover:bg-red-500 items-center bg-stone-800"
    >
      {epNumber}
    </Link>
  );
};

const SingleCharacter: React.FC<TProps> = ({ character }) => {
  return (
    <>
      <div className="rounded-lg bg-zinc-600 text-white mb-4">
        <div className="flex flex-col md:flex-row text-white">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-96 md:w-96 md:h-96 rounded-t-lg md:rounded-l-lg object-cover"
          />
          <div className="p-4 flex flex-col text-sm gap-y-4 md:pl-7 md:py-5">
            <div className="gap-y-1">
              <div className="text-xl font-bold">{character.name}</div>
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
              <div className="text-zinc-400">Gender:</div>
              <div className="text-zinc-200 text-lg">{character?.gender}</div>
            </div>
            {!isEmpty(character.type) && (
              <div className="gap-y-1">
                <div className="text-zinc-400">Type:</div>
                <div className="text-zinc-200 text-lg">{character?.type}</div>
              </div>
            )}
            <div className="gap-y-1">
              <div className="text-zinc-400">Location:</div>
              {isEmpty(character.location.url) ? (
                <div className="text-zinc-200 text-lg">
                  {character?.location?.name}
                </div>
              ) : (
                <Link
                  to={`/location/${character?.location?.url.split("/").pop() || ""}`}
                  className="text-zinc-200 text-lg hover:opacity-75"
                >
                  {character?.location?.name}
                </Link>
              )}
            </div>

            <div className="gap-y-1">
              <div className="text-zinc-400">Origin:</div>
              {isEmpty(character.origin.url) ? (
                <div className="text-zinc-200 text-lg">
                  {character?.origin?.name}
                </div>
              ) : (
                <Link
                  to={`/location/${character?.origin?.url.split("/").pop() || ""}`}
                  className="text-zinc-200 text-lg"
                >
                  {character?.origin?.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-zinc-600 text-white mt-6 p-4 gap-6">
        <div className="text-zinc-400">Episodes:</div>
        <div className="flex flex-row gap-2 flex-wrap">
          {character.episode.map((ep) => (
            <Episode key={ep} url={ep} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleCharacter;
