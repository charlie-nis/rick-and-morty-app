import { useParams } from "react-router-dom";
import { useSingleEpisode } from "@/hooks/useSingleEpisode";
import { AllCharacters, FullScreenLoader, ErrorMessage } from "@/components";
import { isEmpty } from "lodash";

const Episode = () => {
  const { id } = useParams();
  const errorMessage = "No episode found with the given ID.";

  const {
    data: episode,
    isLoading: isEpisodeLoading,
    error,
  } = useSingleEpisode({
    id: Number(id),
  });

  if (isNaN(Number(id))) return <ErrorMessage message={errorMessage} />;

  const charactersArray = Array.isArray(episode?.characters)
    ? episode?.characters?.map((char) => Number(char.split("/").pop()))
    : undefined;

  if (isEpisodeLoading) return <FullScreenLoader />;

  if (error) {
    if (error.message == errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }
  }
  return (
    <>
      <div className="rounded-lg bg-zinc-600  text-white ">
        <div className={`flex flex-row text-white text-xl  items-center  `}>
          <div className="pl-7 py-5 flex flex-col text-sm gap-y-4">
            <div className="gap-y-1">
              <div className="text-zinc-400">Episode name:</div>
              <div className="text-3xl font-bold">{episode?.name}</div>
            </div>
            <div className="gap-y-1">
              <div className="text-zinc-400">Episode:</div>
              <div className="text-zinc-200 text-lg">{episode?.episode}</div>
            </div>
            <div className="gap-y-1">
              <div className="text-zinc-400">Air Date:</div>
              <div className="text-zinc-200 text-lg">{episode?.air_date}</div>
            </div>
          </div>
        </div>
      </div>
      {!isEmpty(charactersArray) && (
        <AllCharacters characterArray={charactersArray} />
      )}
    </>
  );
};

export default Episode;
