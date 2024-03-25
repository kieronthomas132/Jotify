import {
  useDeleteNode,
  useGetNotes,
} from "../../lib/react-query/queries&Mutations.tsx";
import { Button, CircularProgress } from "@nextui-org/react";
import { useAppSelector } from "../../redux/hook.tsx";
import { useNoteIdContext } from "../../context/noteIdContext.tsx";
import { useFilteredCategoryContext } from "../../context/filteredCategoryContext.tsx";
import { FaTrash } from "react-icons/fa";
import { memo, useCallback, useState } from "react";

const Notes = () => {
  const user = useAppSelector((state) => state.user);
  const { data: notes, isFetching: isNotesFetching } = useGetNotes(user.id);
  const { mutateAsync: deleteNote, isPending: isDeletingNote } =
    useDeleteNode();
  const { setNoteId } = useNoteIdContext();
  const { categoryValue } = useFilteredCategoryContext();
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);

  const filteredNotes =
    categoryValue === "All"
      ? notes
      : notes?.filter((note) => note.category === categoryValue);

  const handleDeleteNote = useCallback(
    async (noteId: string) => {
      await deleteNote({ noteId });
      if (notes && notes.length > 0) {
        setNoteId(notes[0].$id);
      } else {
        setNoteId("");
      }
    },
    [deleteNote, notes, setNoteId],
  );

  return (
    <div>
      <ul className="p-2">
        {isNotesFetching && (
          <div className="w-full flex justify-center items-center text-center h-32">
            <CircularProgress
              classNames={{
                svg: "w-12 h-12 drop-shadow-md",
                indicator: "stroke-[#37996B]",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}
              strokeWidth={3}
              showValueLabel={true}
            />
          </div>
        )}
        {filteredNotes &&
          !isNotesFetching &&
          filteredNotes.map((note, index) => (
            <li
              onMouseEnter={() => setHoveredNote(index)}
              onMouseLeave={() => setHoveredNote(null)}
              key={note.$id}
              className="cursor-pointer p-2 rounded-lg"
            >
              <Button
                onClick={() => setNoteId(note.$id)}
                size="lg"
                className="flex hover:bg-[#333333] justify-between bg-[#2E2E2E] text-sm font-[600] text-white w-full text-start  "
              >
                <span className="flex items-center gap-4">
                  <div
                    style={{
                      background: note.colour,
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                    }}
                  />

                  <div>
                    <h4>{note.title}</h4>
                  </div>
                </span>
                {hoveredNote === index && (
                  <Button
                    onClick={() => handleDeleteNote(note.$id)}
                    className="bg-transparent text-[#C3C3C3]"
                    isIconOnly={true}
                  >
                    {isDeletingNote && hoveredNote === index ? (
                        <CircularProgress
                            classNames={{
                                svg: "w-9 h-9 drop-shadow-md",
                                indicator: "stroke-[#37996B]",
                                track: "stroke-white/10",
                                value: "text-3xl font-semibold text-white",
                            }}
                            strokeWidth={3}
                            showValueLabel={true}
                        />
                    ) : (
                      <FaTrash />
                    )}
                  </Button>
                )}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Notes);
