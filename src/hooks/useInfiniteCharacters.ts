import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { TCharacterResponse } from "@/types/allTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchCharacters = async ({
  pageParam = 1,
  filters,
}: {
  pageParam?: number;
  filters?: Record<string, string>;
}): Promise<TCharacterResponse> => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    ...filters,
  });

  try {
    const { data } = await axios.get<TCharacterResponse>(
      `${baseUrl}/character?${params}`
    );
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("No characters found with the given search criteria.");
    } else {
      throw error;
    }
  }
};

export const useInfiniteCharacters = (filters: Record<string, string> = {}) => {
  return useInfiniteQuery({
    queryKey: ["rickAndMortyCharacters-", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchCharacters({ pageParam, filters });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.info.next
        ? Number(new URL(lastPage.info.next).searchParams.get("page"))
        : undefined,
  });
};
