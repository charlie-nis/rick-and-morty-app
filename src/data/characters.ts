import { useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { mapCharacterResponse } from "@/utils/characterMapping";


const getCharacter = ({}) => {
  const endpoint = `https://rickandmortyapi.com/api/character`;

  const query = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const response = await axios.get(endpoint);
      const data = await response.data;
      return data;
    },
  });

  const { isFetching, isLoading, isError, data, error, refetch } = query;

  const mappedData = useMemo(() => {
    return mapCharacterResponse(data);
  }, [data]);

  const character = mappedData.results;
  const info = mappedData.info;

  return {
    character,
    info,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default getCharacter;
