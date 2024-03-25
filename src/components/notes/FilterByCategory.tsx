import { Select, SelectItem } from "@nextui-org/react";
import { categories } from "./categories.tsx";

function FilterByCategory({
  handleOnClick,
}: {
  handleOnClick: (colour: string, category: string) => void;
}) {
  const filteredCategory = categories.filter(
    (category) => category.category !== "Default",
  );

  return (
    <article className="p-2 w-full">
      <Select
        defaultSelectedKeys={["All"]}
        variant="bordered"
        items={filteredCategory}
        size="sm"
        label="Filter by Category"
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
        {(categories) => (
          <SelectItem
            onClick={() =>
              handleOnClick(categories.colour, categories.category)
            }
            key={categories.category}
            textValue={`${categories.category}`}
          >
            <div className="flex gap-2 items-center">
              <div
                className="flex-shrink-0"
                style={{
                  background: categories.colour || "#CCCCCC",
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                }}
              ></div>
              <div className="flex flex-col">
                <span className="text-small">{categories.category}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </article>
  );
}

export default FilterByCategory;
