import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPage = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        per_page: 50,
        page: pageParam,
        price_change_percentage: "7d",
      },
    }
  );
  return { data, nextPage: pageParam + 1 };
};

export const useGetData = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["coins"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchPage({ pageParam }),
    getNextPageParam: (last) => last.nextPage,
    staleTime: 60000,
  });

  return {
    data,
    loading: isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};
