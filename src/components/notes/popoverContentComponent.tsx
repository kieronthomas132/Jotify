import { useState } from "react";
import { useFilteredCategoryContext } from "../../context/filteredCategoryContext.tsx";
import FilterByCategory from "./FilterByCategory.tsx";
import CreateNewNote from "./createNewNote.tsx";

const PopoverContentComponent = () => {
  const { setCategoryValue } = useFilteredCategoryContext();
  const [selectedColour, setSelectedColour] = useState("#CCCCCC");
  const [selectCategory, setSelectCategory] = useState("Default");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOnClick = async (colour: string, category: string) => {
    setSelectedColour(colour);
    setCategoryValue(category);
  };
  const handleSelectCategory = (colour: string, category: string) => {
    setSelectedColour(colour);
    setSelectCategory(category);
  };
  return (
    <section className="flex items-center">
      <FilterByCategory handleOnClick={handleOnClick} />
      <CreateNewNote
        title={title}
        selectCategory={selectCategory}
        selectedColour={selectedColour}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        setSelectedCategory={setSelectCategory}
        setSelectedColour={setSelectedColour}
        handleSelectCategory={handleSelectCategory}
      />
    </section>
  );
};

export default PopoverContentComponent;
