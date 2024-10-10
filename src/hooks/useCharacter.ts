import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TCharacter } from "@/types/allTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchCharacterById = async ({
  id,
}: {
  id: number | number[] | undefined;
}) => {
  const { data } = await axios.get<TCharacter | TCharacter[]>(
    `${baseUrl}/character/${id?.toString()}`
  );
  return data;
};

export const useCharacter = ({ id }: { id: number | number[] | undefined }) => {
  return useQuery({
    queryKey: ["rickAndMortyCharacter-", id],
    queryFn: () => fetchCharacterById({ id }),
    enabled: !!id,
  });
};
