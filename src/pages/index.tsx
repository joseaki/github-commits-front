import { getCommits } from "@/services/github.service";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { CommitsTable } from "@/components/templates/commitsTable/commitsTable";
import { useCommits } from "@/hooks/useCommits";
import Input from "@/components/atoms/Input/input";
import Button from "@/components/atoms/Button/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { MainPage, SearchForm } from "@/interfaces/mainPage.interface";
import { useRepo } from "@/hooks/useRepo";
import { DEFAULT_REPO } from "@/config/constants";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Loading from "@/components/atoms/Loading/loading";
import ErrorMessage from "@/components/atoms/ErrorMessage/errorMessage";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const itemsPerPage = 20;
    const page = 1;
    const searchQueryParam = query.search as string;
    const repo = searchQueryParam ? searchQueryParam : DEFAULT_REPO;
    const data = await getCommits({
      pageParam: { itemsPerPage, page, repo },
    });
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
      queryKey: [repo],
      structuralSharing: () => ({ pageParams: [null], pages: [data] }),
      queryFn: () => data,
    });
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.response.data.message?.[0].constraints?.[0],
      },
    };
  }
};

export default function Home({ error }: MainPage) {
  const { setRepo } = useRepo();
  const { query, push } = useRouter();
  const { isFetching, isFetchingNextPage } = useCommits();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit: SubmitHandler<SearchForm> = async (data) => {
    push({
      pathname: "/",
      query: { search: data.search },
    });
    setRepo(data.search ? data.search : DEFAULT_REPO);
  };

  return (
    <main className="md:container md:mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-end py-6"
      >
        <Input
          label="Search commits on other repositories"
          placeholder="Github url"
          defaultValue={query.search as string}
          register={register("search")}
          disabled={isFetching || isFetchingNextPage}
        />
        <Button text="Search" />
      </form>

      <CommitsTable />
      {error ? <ErrorMessage error={error} /> : null}
      {(isFetching || isFetchingNextPage) && !error ? <Loading /> : null}
    </main>
  );
}
