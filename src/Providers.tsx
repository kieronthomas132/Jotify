import { NextUIProvider } from "@nextui-org/react";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import { NoteIdContextProvider } from "./context/noteIdContext.tsx";
import { FilteredCategoryContextProvider } from "./context/filteredCategoryContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <QueryProvider>
        <NoteIdContextProvider>
          <FilteredCategoryContextProvider>
            <Provider store={store}>
              <BrowserRouter>{children}</BrowserRouter>
            </Provider>
          </FilteredCategoryContextProvider>
        </NoteIdContextProvider>
      </QueryProvider>
    </NextUIProvider>
  );
};

export default Providers;
