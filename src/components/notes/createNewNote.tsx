import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { categories } from "./categories.tsx";
import { useAppSelector } from "../../redux/hook.tsx";
import { Dispatch, SetStateAction } from "react";
import { useCreateNewNote } from "../../lib/react-query/queries&Mutations.tsx";

const CreateNewNote = ({
  title,
  selectedColour,
  selectCategory,
  content,
  setTitle,
  setContent,
  setSelectedCategory,
  setSelectedColour,
  handleSelectCategory,
}: {
  title: string;
  selectedColour: string;
  selectCategory: string;
  content: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  setSelectedColour: Dispatch<SetStateAction<string>>;
  handleSelectCategory: (colour: string, category: string) => void;
}) => {
  const user = useAppSelector((state) => state.user);
  const { mutateAsync: createNewNote } = useCreateNewNote();

  const handleCreateNewNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewNote({
      userId: user.id,
      title: title,
      colour: selectedColour,
      category: selectCategory,
      content: content,
    });
    setTitle("");
    setContent("");
    setSelectedCategory("Default");
    setSelectedColour(categories[0].colour);
  };

  const filteredCategory = categories.filter(
    (category) => category.category !== "All",
  );

  return (
    <Popover className="w-[300px]" placement="bottom">
      <PopoverTrigger>
        <Button
          radius="sm"
          isIconOnly={true}
          className="text-[#CBCBCB] mr-3 focus:border-none bg-[#2E2E2E]"
        >
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-[#2E2E2E] text-[#C3C3C3]">
        <form className="w-full" onSubmit={handleCreateNewNote}>
          <section className="px-1 w-full py-2">
            <div className="text-small mb-2 font-bold">Create new Note</div>
            <div className="flex items-center gap-4 flex-row">
              <div
                style={{
                  background: selectedColour || "#CCCCCC",
                  height: "20px",
                  width: "23px",
                  borderRadius: "50%",
                }}
              />
              <Select
                defaultSelectedKeys={["Default"]}
                variant="bordered"
                items={filteredCategory}
                placeholder="Select a category"
                className="w-full bg-[#2E2E2E]"
                classNames={{
                  base: "bg-[#2E2E2E]",
                  value: "text-[#C3C3C3]",
                  trigger: "border border-[#1C1C1C]",
                }}
                popoverProps={{
                  classNames: {
                    base: "before:bg-default-200",
                    content:
                      "p-0 border-small border-divider bg-[#2E2E2E] text-[#C3C3C3]",
                  },
                }}
              >
                {(categories) => (
                  <SelectItem
                    onClick={() =>
                      handleSelectCategory(
                        categories.colour,
                        categories.category,
                      )
                    }
                    key={categories.category}
                    textValue={`${categories.category}`}
                  >
                    <div className="flex gap-2 items-center">
                      <div
                        className="flex-shrink-0"
                        style={{
                          background: categories.colour,
                          height: "10px",
                          width: "10px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <div className="flex flex-col">
                        <span className="text-small">
                          {categories.category}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>
          </section>
          <section className="text-start p-1 w-full">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              className="p-1.5 w-[100%] bg-transparent text-[#C3C3C3] border border-[#1C1C1C] text-tiny rounded-lg focus:outline-none"
            />
          </section>
          <section className="text-start p-1 w-full">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              type="text"
              className="p-1.5 w-[100%] bg-transparent text-[#C3C3C3] border border-[#1C1C1C] text-tiny rounded-lg focus:outline-none"
            />
          </section>
          <span className="w-full justify-end flex p-2">
            <Button
              className="bg-[#37996B] focus:border-none text-[11px] text-[#EDEDED] border border-[#3DCF8E]"
              size="sm"
              type="submit"
            >
              Create
            </Button>
          </span>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CreateNewNote;
