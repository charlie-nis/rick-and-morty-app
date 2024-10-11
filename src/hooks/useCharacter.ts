import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TCharacter } from "@/types/allTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchCharacterById = async ({
  id,
}: {
  id: number | number[] | undefined;
}) => {
  try {
    const { data } = await axios.get<TCharacter | TCharacter[]>(
      `${baseUrl}/character/${id?.toString()}`
    );

    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("No character found with the given ID.");
    } else {
      throw error;
    }
  }
};

export const useCharacter = ({ id }: { id: number | number[] | undefined }) => {
  return useQuery({
    queryKey: ["rickAndMortyCharacter-", id],
    queryFn: () => fetchCharacterById({ id }),
    enabled: !!id,
  });
};
