import { useQuery } from "@tanstack/react-query";
import APIClient from "./../utils/ApiClient";

export const useFetchData = ({ endPoints, ...props }) => {
  const apiClient = new APIClient(endPoints);

  return useQuery({
    queryKey: [endPoints, props],
    queryFn: () => apiClient.getAll({ ...props }),
  });
};
