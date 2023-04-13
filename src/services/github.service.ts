import axiosClient from "@/config/axiosClient";

export const getCommits = async (props: any) => {
  const { pageParam, queryKey } = props;
  const { itemsPerPage = 20, page = 1, repo = queryKey[0] } = pageParam ?? {};
  const resp = await axiosClient.get("api/commits", {
    params: { itemsPerPage, page, repo },
  });
  return resp.data;
};
