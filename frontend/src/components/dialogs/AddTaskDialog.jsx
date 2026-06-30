import React, { useState } from 'react';
import { addTask } from "../../services/taskServices";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddTaskDialog({ open, onOpenChange, userId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
  };

  const handleClose = (isOpen) => {
    onOpenChange(isOpen);
    if (!isOpen) resetForm();
  };

  
    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim()) {
    alert("Please enter task title");
    return;
  }

  if (!userId) {
    alert("User not found. Please login again.");
    console.log("Missing userId:", userId);
    return;
  }

  setIsSubmitting(true);

  try {
    await addTask(userId, {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
    });
    alert("Task added successfully");

    resetForm();
    onOpenChange(false);
  } catch (error) {
    console.error("Failed to add task:", error);
    alert(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border border-[#e2e8f0] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#0f172a] tracking-tight">
            Add New Task
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Title</label>
            <Input
              type="text"
              required
              placeholder="e.g., Submit Q3 Report"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f8fafc] border-[#e2e8f0] text-sm focus-visible:ring-[#2563eb] rounded-xl"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Description</label>
            <Textarea
              placeholder="Add details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#f8fafc] border-[#e2e8f0] text-sm focus-visible:ring-[#2563eb] rounded-xl resize-none min-h-[80px]"
            />
          </div>

          {/* Grid Layout for Date & Priority */}
          <div className="grid grid-cols-2 gap-4">
            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Due Date</label>
              <Input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#f8fafc] border-[#e2e8f0] text-sm focus-visible:ring-[#2563eb] rounded-xl"
              />
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full bg-[#f8fafc] border-[#e2e8f0] text-sm focus:ring-[#2563eb] rounded-xl text-left">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#e2e8f0] rounded-xl shadow-lg">
                  <SelectItem value="Low" className="text-sm font-medium focus:bg-slate-50 focus:text-slate-900">Low</SelectItem>
                  <SelectItem value="Medium" className="text-sm font-medium focus:bg-slate-50 focus:text-slate-900">Medium</SelectItem>
                  <SelectItem value="High" className="text-sm font-medium focus:bg-slate-50 focus:text-slate-900">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Actions */}
          <DialogFooter className="pt-4 flex flex-row items-center justify-end gap-2 sm:space-x-0">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => handleClose(false)}
              className="border-[#e2e8f0] text-[#64748b] font-semibold text-xs py-2 px-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2563eb] text-white font-bold text-xs py-2 px-4 rounded-xl hover:bg-blue-700 shadow-sm transition-colors"
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}