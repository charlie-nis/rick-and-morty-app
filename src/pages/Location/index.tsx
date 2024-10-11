import { useParams } from "react-router-dom";
import { useSingleLocation } from "@/hooks/useSingleLocation";
import { AllCharacters, FullScreenLoader, ErrorMessage } from "@/components";
import { isEmpty } from "lodash";

const Location = () => {
  const { id } = useParams();
  const errorMessage = "No location found with the given ID.";

  const {
    data: location,
    isLoading: isLocationLoading,
    error,
  } = useSingleLocation({
    id: Number(id),
  });

  if (isNaN(Number(id))) return <ErrorMessage message={errorMessage} />;

  const residents = Array.isArray(location?.residents)
    ? location?.residents?.map((resident) => Number(resident.split("/").pop()))
    : undefined;

  if (isLocationLoading) return <FullScreenLoader />;

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
              <div className="text-zinc-400">Location:</div>
              <div className="text-3xl font-bold">{location?.name}</div>
            </div>
            <div className="gap-y-1">
              <div className="text-zinc-400">Dimension:</div>
              <div className="text-zinc-200 text-lg">{location?.dimension}</div>
            </div>
            <div className="gap-y-1">
              <div className="text-zinc-400">Type:</div>
              <div className="text-zinc-200 text-lg">{location?.type}</div>
            </div>
          </div>
        </div>
      </div>
      {!isEmpty(residents) && <AllCharacters characterArray={residents} />}
    </>
  );
};

export default Location;
