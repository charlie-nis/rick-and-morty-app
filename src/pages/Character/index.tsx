import { useParams } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacter";
import { TCharacter } from "@/types/allTypes";
import { FullScreenLoader, ErrorMessage } from "@/components";
import { SingleCharacter } from "./components";

const Character = () => {
  const { id } = useParams();
  const errorMessage = "No character found with the given ID.";

  const { data, isLoading, error } = useCharacter({ id: Number(id) });

  if (isLoading) return <FullScreenLoader />;

  if (isNaN(Number(id))) return <ErrorMessage message={errorMessage} />;

  if (error) {
    if (error.message == errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }
  }

  const character = data as TCharacter;

  return (
    <div className="flex-col">
      <SingleCharacter character={character} />
    </div>
  );
};
export default Character;
