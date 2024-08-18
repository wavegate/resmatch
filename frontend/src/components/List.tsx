import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useListState } from "@mantine/hooks";
import { MdDragIndicator } from "react-icons/md";
import { TextInput, Button } from "@mantine/core";

interface GenericListProps<T> {
  onItemsChange: (items: T[]) => void;
  initialItems: T[];
  renderItem: (
    item: T,
    index: number,
    removeItem: (id: any) => void
  ) => JSX.Element;
  getItemId: (item: T) => any;
  addItemPlaceholder?: string; // Placeholder for the input field
}

export default function GenericList<T>({
  onItemsChange,
  initialItems = [],
  renderItem,
  getItemId,
  addItemPlaceholder = "Add a new item",
}: GenericListProps<T>) {
  const [items, handlers] = useListState<T>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (initialItems.length > 0) {
      handlers.setState(initialItems);
    }
  }, [initialItems]);

  const handleRemoveItem = (itemId: any) => {
    const updatedItems = items.filter((item) => getItemId(item) !== itemId);
    handlers.setState(updatedItems);
    onItemsChange(updatedItems);
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    handlers.reorder({ from: source.index, to: destination.index });
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);
    onItemsChange(updatedItems);
  };

  const handleAddItem = () => {
    const trimmedItem = newItem.trim();
    if (trimmedItem && !items.some((item) => getItemId(item) === trimmedItem)) {
      const updatedItems = [...items, trimmedItem as unknown as T];
      handlers.append(trimmedItem as unknown as T);
      onItemsChange(updatedItems);
      setNewItem(""); // Clear input after adding
    }
  };

  const renderedItems = items.map((item, index) => (
    <Draggable
      key={getItemId(item)}
      index={index}
      draggableId={getItemId(item).toString()}
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
          {renderItem(item, index, handleRemoveItem)}
        </div>
      )}
    </Draggable>
  ));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <TextInput
          value={newItem}
          onChange={(e) => setNewItem(e.currentTarget.value)}
          placeholder={addItemPlaceholder}
          size="md"
        />
        <Button onClick={handleAddItem} size="md">
          Add
        </Button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {renderedItems}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
