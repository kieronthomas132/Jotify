import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface INoteID {
  noteId: string;
  setNoteId: Dispatch<SetStateAction<string>>;
}

export const NoteIdContext = createContext<INoteID | undefined>(undefined);

export const useNoteIdContext = () => {
  const context = useContext(NoteIdContext);

  if (!context) {
    throw new Error("useNoteIdContext must be used in a NoteIdContextProvider");
  }
  return context;
};

export const NoteIdContextProvider = ({ children }: { children: ReactNode }) => {
  const [noteId, setNoteId] = useState("");

  return (
    <NoteIdContext.Provider value={{ noteId, setNoteId }}>
      {children}
    </NoteIdContext.Provider>
  );
};
