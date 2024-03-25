import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ICategoryContextProps {
  categoryValue: string;
  setCategoryValue: Dispatch<SetStateAction<string>>;
}

export const FilteredCategoryContext = createContext<
  ICategoryContextProps | undefined
>(undefined);

export const useFilteredCategoryContext = () => {
  const context = useContext(FilteredCategoryContext);

  if (!context) {
    throw new Error(
      "useFilteredCategoryContext must be used in a FilteredCategoryContextProvider provider",
    );
  }

  return context;
};

export const FilteredCategoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoryValue, setCategoryValue] = useState("All");

  return (
    <FilteredCategoryContext.Provider
      value={{ categoryValue, setCategoryValue }}
    >
      {children}
    </FilteredCategoryContext.Provider>
  );
};
