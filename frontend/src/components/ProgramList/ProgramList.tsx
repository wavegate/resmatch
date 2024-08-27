import { Button, Text } from "@mantine/core";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useListState } from "@mantine/hooks";
import { MdDragIndicator } from "react-icons/md";
import { useEffect } from "react";
import programName from "@/utils/programName";

export default function ProgramList({
  onProgramsChange,
  initialPrograms = [],
}) {
  const [programs, handlers] = useListState([]);

  useEffect(() => {
    if (initialPrograms.length > 0) {
      handlers.setState(
        initialPrograms.map((program, index) => ({
          ...program,
          rank: index + 1,
        }))
      );
    }
  }, [initialPrograms]);

  const handleProgramSelect = (program) => {
    if (program && !programs.some((p) => p.programId === program.id)) {
      const newProgram = {
        programId: program.id,
        name: program.name,
        institution: program.institution,
        nrmpProgramCode: program.nrmpProgramCode,
        rank: programs.length + 1,
      };
      handlers.append(newProgram);
      onProgramsChange(
        [...programs, newProgram].map((p) => ({
          programId: p.programId,
          rank: p.rank,
        }))
      ); // Update form state with array of IDs and ranks
    }
  };

  const handleRemoveProgram = (programId) => {
    const updatedPrograms = programs.filter(
      (program) => program.programId !== programId
    );
    handlers.setState(updatedPrograms);
    onProgramsChange(
      updatedPrograms.map((p, index) => ({
        programId: p.programId,
        rank: index + 1,
      }))
    ); // Update form state with reordered ranks
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    handlers.reorder({ from: source.index, to: destination.index });
    const updatedPrograms = [...programs];
    const [movedProgram] = updatedPrograms.splice(source.index, 1);
    updatedPrograms.splice(destination.index, 0, movedProgram);
    onProgramsChange(
      updatedPrograms.map((p, index) => ({
        programId: p.programId,
        rank: index + 1,
      }))
    ); // Update form state with reordered ranks
  };

  const items = programs.map((program, index) => (
    <Draggable
      key={program.programId}
      index={index}
      draggableId={program.programId.toString()}
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
          <Text>{programName(program)}</Text>
          <Button
            size="xs"
            variant="outline"
            color="red"
            onClick={() => handleRemoveProgram(program.programId)}
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
