import { getCommits } from "@/services/github.service";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { CommitsTable } from "@/components/templates/commitsTable/commitsTable";
import { useCommits } from "@/hooks/useCommits";
import Input from "@/components/atoms/Input/input";
import Button from "@/components/atoms/Button/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  MainPage,
  SearchForm,
} from "@/components/interfaces/mainPage.interface";
import { useRepo } from "@/hooks/useRepo";
import { DEFAULT_REPO } from "@/config/constants";
import Router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";

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
  const { query } = useRouter();
  const { isFetching, isFetchingNextPage } = useCommits();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit: SubmitHandler<SearchForm> = async (data) => {
    Router.push({
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
      {error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
      ) : null}
      {(isFetching || isFetchingNextPage) && !error ? (
        <div className="flex flex-row justify-center py-16">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900 dark:text-slate-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : null}
    </main>
  );
}
