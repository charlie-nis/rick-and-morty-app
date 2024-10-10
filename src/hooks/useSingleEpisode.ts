import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type TEpisode } from "@/types/allTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchEpisodeById = async ({ id }: { id: number }) => {
  const { data } = await axios.get<TEpisode>(
    `${baseUrl}/episode/${id.toString()}`
  );
  return data;
};

export const useSingleEpisode = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["rickAndMortyEpisode-", id],
    queryFn: () => fetchEpisodeById({ id }),
    enabled: !!id,
  });
};
