import { getCommits } from "@/services/github.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRepo } from "./useRepo";

export const useCommits = () => {
  const { repo } = useRepo();
  const {
    data,
    isFetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [repo],
    queryFn: getCommits,
    getNextPageParam: (lastPage, pages) => {
      if (
        lastPage.data.itemsPerPage != lastPage.data.totalItems ||
        lastPage.data.items.length === 0
      ) {
        return undefined;
      }
      return {
        page: lastPage.data.nextPage,
        itemsPerPage: lastPage.data.itemsPerPage,
        repo,
      };
    },
  });

  return {
    data,
    isFetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};
