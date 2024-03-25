import PopoverContentComponent from "./popoverContentComponent.tsx";
import Notes from "./notes.tsx";

const Sidebar = () => {
  return (
    <section className="md:w-[30%] hidden md:block h-[92%] border-r border-[#2E2E2E]">
      <PopoverContentComponent />
      <Notes />
    </section>
  );
};

export default Sidebar;
