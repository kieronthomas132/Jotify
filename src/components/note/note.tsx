import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hook.tsx";
import {
  useGetNote,
  useGetNotes,
  useUpdateNote,
} from "../../lib/react-query/queries&Mutations.tsx";
import { useNoteIdContext } from "../../context/noteIdContext.tsx";
import {
  Button,
  CircularProgress,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { categories } from "../notes/categories.tsx";

const Note = () => {
  const user = useAppSelector((state) => state.user);
  const { data: notes, isFetching: isFetchingNotes } = useGetNotes(user.id);
  const { noteId, setNoteId } = useNoteIdContext();
  const { data: note, isFetching: isFetchingNote } = useGetNote(noteId);
  const { mutateAsync: updateNote, isPending: isUpdatingNote } =
    useUpdateNote();
  const [textareaContent, setTextareaContent] = useState(note?.content || "");
  const [title, setTitle] = useState(note?.title || "");
  const [category, setCategory] = useState(note?.category || "");
  const [color, setColor] = useState(note?.colour || "");

  useEffect(() => {
    if (notes && notes.length > 0 && !noteId) {
      setNoteId(notes[0]?.$id);
    }
  }, [notes, noteId, setNoteId]);

  useEffect(() => {
    setTextareaContent(note?.content || "");
    setTitle(note?.title || "");
    setCategory(note?.category || "");
    setColor(note?.colour || "");
  }, [note]);

  const handleUpdateNote = useCallback(async () => {
    await updateNote({
      noteId,
      content: textareaContent,
      title,
      category,
      colour: color,
    });
  }, [updateNote, noteId, textareaContent, title, category, color]);

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaContent(e.target.value);
    },
    [],
  );

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleColourCategoryChange = useCallback(
    (category: string, colour: string) => {
      setCategory(category);
      setColor(colour);
    },
    [],
  );

  const filteredCategory = categories.filter(
    (category) =>
      category.category !== "All" && category.category !== "Default",
  );

  if (isFetchingNotes && isFetchingNote) {
    return (
      <div className="absolute left-[50%] md:left-[60%] top-[50%]">
        {" "}
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
    );
  }

  return (
    <section className="p-3 overflow-y-auto w-full ml-5">
      <>
        <div className="flex justify-between items-center border-b border-[#2E2E2E]">
          {notes &&
          notes?.length === 0 &&
          !isFetchingNotes &&
          !isFetchingNote ? (
            <h1 className="text-[4vw]">you currently have no notes</h1>
          ) : (
            ""
          )}
          <div className="flex my-4 items-center gap-3">
            {notes && notes.length > 0 && (
              <Popover className="w-[300px]" placement="bottom">
                <PopoverTrigger>
                  <div
                    style={{
                      cursor: "pointer",
                      background: color,
                      width: window.innerWidth > 400 ? "20px" : "15px",
                      height: window.innerWidth > 400 ? "20px" : "15px",
                      borderRadius: "50%",
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="bg-[#2E2E2E] text-[#C3C3C3]">
                  <Select
                    defaultSelectedKeys={[category]}
                    variant="bordered"
                    items={filteredCategory}
                    size="sm"
                    label="Change Category"
                    className="w-full"
                    style={{
                      backgroundColor: "#2E2E2E",
                      color: "#ffffff",
                    }}
                    classNames={{
                      value: "text-[#C3C3C3]",
                      trigger: "border border-[#1C1C1C]",
                    }}
                    popoverProps={{
                      classNames: {
                        content:
                          "p-0 border-small border-divider bg-[#2E2E2E] text-[#C3C3C3]",
                      },
                    }}
                  >
                    {(filteredCategory) => (
                      <SelectItem
                        onClick={() =>
                          handleColourCategoryChange(
                            filteredCategory.category,
                            filteredCategory.colour,
                          )
                        }
                        key={filteredCategory.category}
                        textValue={`${filteredCategory.category}`}
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className="flex-shrink-0"
                            style={{
                              background: filteredCategory.colour,
                              height: "10px",
                              width: "10px",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div className="flex flex-col">
                            <span className="text-small">
                              {filteredCategory.category}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </PopoverContent>
              </Popover>
            )}
            {notes && notes?.length > 0 && (
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e)}
                className="md:text-[2.5vw] bg-transparent text-[5vw] line-clamp-1 font-[600] focus:outline-none"
              />
            )}
          </div>
          {(textareaContent !== note?.content ||
            title !== note?.title ||
            category !== note?.category ||
            color !== note?.colour) &&
            !isFetchingNotes &&
            !isFetchingNote && notes && notes.length > 0 && (
              <Button
                size="sm"
                onClick={() => handleUpdateNote()}
                className="bg-[#37996B]  text-[11px] text-[#EDEDED] border border-[#3DCF8E]"
              >
                {isUpdatingNote ? "Updating" : "Update Note"}
              </Button>
            )}
        </div>
        <div className="flex pb-5  flex-col">
    <textarea
        className="w-full h-[76vh] bg-transparent mt-5 p-3 focus:outline-none resize-none"
        value={textareaContent}
        onChange={handleContentChange}
    />
        </div>
      </>
    </section>
  );
};

export default memo(Note);
