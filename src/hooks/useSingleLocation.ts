import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type TLocation } from "@/types/allTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchLocationById = async ({ id }: { id: number }) => {
  const { data } = await axios.get<TLocation>(
    `${baseUrl}/location/${id.toString()}`
  );
  return data;
};

export const useSingleLocation = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["rickAndMortyLocation-", id],
    queryFn: () => fetchLocationById({ id }),
    enabled: !!id,
  });
};
