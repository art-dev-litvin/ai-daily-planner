"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface CreateTaskFormProps {}

type PriorityValue = "none" | "low" | "medium" | "high";
interface PrioritiesListItem {
  label: string;
  value: PriorityValue;
  styles: string;
  hoverStyles: string;
}

const prioritiesList: PrioritiesListItem[] = [
  {
    label: "None",
    value: "none",
    styles: "bg-zinc-100 text-zinc-500 ",
    hoverStyles:
      "data-[highlighted]:bg-zinc-200 data-[highlighted]:text-zinc-800!",
  },
  {
    label: "Low",
    value: "low",
    styles: "bg-emerald-50 text-emerald-600 ",
    hoverStyles:
      "data-[highlighted]:bg-emerald-100 data-[highlighted]:text-emerald-700!",
  },
  {
    label: "Medium",
    value: "medium",
    styles: "bg-amber-50 text-amber-600 ",
    hoverStyles:
      "data-[highlighted]:bg-amber-100 data-[highlighted]:text-amber-700!",
  },
  {
    label: "High",
    value: "high",
    styles: "bg-rose-50 text-rose-600 ",
    hoverStyles:
      "data-[highlighted]:bg-rose-100 data-[highlighted]:text-rose-700!",
  },
];

function CreateTaskForm({}: CreateTaskFormProps) {
  const [titleValue, setTitleValue] = React.useState("");
  const [timeValue, setTimeValue] = React.useState("");
  const [priorityValue, setPriorityValue] =
    React.useState<PriorityValue>("none");

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setTitleValue(e.target.value);
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setTimeValue(e.target.value);
  };

  const handleSelectChange = (value: PriorityValue) => {
    setPriorityValue(value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      <div className="flex-1 space-y-2">
        <Input
          value={titleValue}
          onChange={handleTitleChange}
          placeholder="Task title..."
          className="w-full"
        />
        <div className="flex gap-2">
          <Input
            value={timeValue}
            onChange={handleTimeChange}
            placeholder="Time (e.g. 14:00)"
            className="w-1/3 text-sm"
          />
          <Select
            open={true}
            value={priorityValue}
            onValueChange={handleSelectChange}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>

            <SelectContent position="popper">
              {prioritiesList.map(({ label, value, styles, hoverStyles }) => (
                <SelectItem
                  className={cn(styles, hoverStyles)}
                  key={`priority-${value}`}
                  value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" size="icon" className="shrink-0">
        <Plus className="w-4 h-4" />
      </Button>
    </form>
  );
}

export default CreateTaskForm;
