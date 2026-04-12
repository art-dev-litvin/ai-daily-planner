import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Sparkles, Plus } from "lucide-react";

export function TaskPanelUI() {
  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="text-lg">Daily Tasks</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-6 overflow-hidden gap-6">
        {/* Add Task Form */}
        <div className="flex gap-2 items-start">
          <div className="flex-1 space-y-2">
            <Input placeholder="Task title..." className="w-full" />
            <div className="flex gap-2">
              <Input
                placeholder="Time (e.g. 14:00)"
                className="w-1/3 text-sm"
              />
              {/* Priority placeholder, normally a Select component */}
              <div className="flex-1 border rounded-md px-3 py-2 text-sm text-muted-foreground flex items-center">
                Select Priority...
              </div>
            </div>
          </div>
          <Button size="icon" className="shrink-0 mt-1">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <Separator />

        {/* Task List */}
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-3">
            {/* Example Pending Task */}
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <Checkbox id="task1" />
                <div className="flex flex-col">
                  <label
                    htmlFor="task1"
                    className="text-sm font-medium leading-none cursor-pointer">
                    Team meeting to discuss Q2 goals
                  </label>
                  <span className="text-xs text-muted-foreground mt-1">
                    10:00 AM
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="destructive">High</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Example Completed Task */}
            <div className="flex items-center justify-between p-3 border rounded-lg opacity-60 bg-muted/30">
              <div className="flex items-center space-x-3">
                <Checkbox id="task2" checked />
                <div className="flex flex-col">
                  <label
                    htmlFor="task2"
                    className="text-sm font-medium leading-none line-through">
                    Review pull requests
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Medium</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>

      {/* Analysis Button Section */}
      <CardFooter className="p-4 border-t bg-muted/20 flex flex-col gap-3">
        <Button className="w-full gap-2" variant="secondary">
          <Sparkles className="w-4 h-4 text-primary" />
          Analyze My Schedule
        </Button>
        {/* Placeholder for Analysis Results */}
        <div className="w-full text-xs text-muted-foreground text-center">
          Click analyze to get AI suggestions and spot conflicts.
        </div>
      </CardFooter>
    </Card>
  );
}
