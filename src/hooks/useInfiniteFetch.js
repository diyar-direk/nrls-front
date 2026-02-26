import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../utils/ApiClient";

export const useInfiniteFetch = ({ endPoint, ...params }) => {
  const apiClient = new APIClient(endPoint);
  const loadMoreRef = useRef(null);

  const queryKey = Object.keys(params).length ? [endPoint, params] : [endPoint];

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        page: pageParam,
        ...params,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
  });

  const { fetchNextPage, hasNextPage, isFetching } = query;

  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return { ...query, loadMoreRef };
};
