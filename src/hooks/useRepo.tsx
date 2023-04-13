import { DEFAULT_REPO } from "@/config/constants";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface RepoProvider {
  repo: string;
  setRepo: Dispatch<SetStateAction<string>>;
}

const RepoContext = createContext<RepoProvider | undefined>(undefined);

export const RepoProvider: FunctionComponent<any> = (props) => {
  const router = useRouter();
  const searchQueryParam = router.query.search as string;
  const [repo, setRepo] = useState<string>(
    searchQueryParam ? searchQueryParam : DEFAULT_REPO
  );

  return (
    <RepoContext.Provider value={{ repo, setRepo }}>
      {props.children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => {
  const context = useContext(RepoContext);
  if (context == undefined) {
    throw new Error("useRepo must be called within a RepoContextProvider");
  }
  return context;
};
