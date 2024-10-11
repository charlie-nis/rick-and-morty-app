import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type TEpisode } from "@/types/allTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchEpisodeById = async ({ id }: { id: number }) => {
  try {
    const { data } = await axios.get<TEpisode>(
      `${baseUrl}/episode/${id.toString()}`
    );
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("No episode found with the given ID.");
    } else {
      throw error;
    }
  }
};

export const useSingleEpisode = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["rickAndMortyEpisode-", id],
    queryFn: () => fetchEpisodeById({ id }),
    enabled: !!id,
  });
};
