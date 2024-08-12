import { Button, Text } from "@mantine/core";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useListState } from "@mantine/hooks";
import { MdDragIndicator } from "react-icons/md";
import { useEffect } from "react";

export default function ProgramList({
  onProgramsChange,
  initialPrograms = [],
}) {
  const [programs, handlers] = useListState([]);

  useEffect(() => {
    if (initialPrograms) {
      handlers.setState(initialPrograms);
    }
  }, [initialPrograms]);

  const handleProgramSelect = (program) => {
    if (program && !programs.some((p) => p.id === program.id)) {
      handlers.append(program);
      const updatedProgramIds = [...programs.map((p) => p.id), program.id];
      onProgramsChange(updatedProgramIds); // Update form state with array of IDs
    }
  };

  const handleRemoveProgram = (id) => {
    const updatedPrograms = programs.filter((program) => program.id !== id);
    handlers.setState(updatedPrograms);
    onProgramsChange(updatedPrograms.map((p) => p.id)); // Update form state
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    handlers.reorder({ from: source.index, to: destination.index });
    const updatedPrograms = [...programs];
    const [movedProgram] = updatedPrograms.splice(source.index, 1);
    updatedPrograms.splice(destination.index, 0, movedProgram);
    onProgramsChange(updatedPrograms.map((p) => p.id)); // Update form state
  };

  const items = programs.map((program, index) => (
    <Draggable
      key={program.id}
      index={index}
      draggableId={program.id.toString()}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex justify-between items-center py-2 px-4 bg-white rounded mb-2 ${
            snapshot.isDragging ? "shadow-lg" : ""
          }`}
        >
          <div {...provided.dragHandleProps} className="cursor-pointer">
            <MdDragIndicator />
          </div>
          <Text>
            {program.name} at {program.institution.name}
          </Text>
          <Button
            size="xs"
            variant="outline"
            color="red"
            onClick={() => handleRemoveProgram(program.id)}
          >
            Remove
          </Button>
        </div>
      )}
    </Draggable>
  ));

  return (
    <div className="flex flex-col gap-4">
      <ProgramSearch
        onProgramSelect={handleProgramSelect}
        label="Add a program to the list"
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="programs-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
