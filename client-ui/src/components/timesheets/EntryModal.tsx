"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Minus, Plus, Info } from "lucide-react";
import { TimesheetEntry, Project } from "@/types";

const entrySchema = z.object({
  projectId: z.string().min(1, "Please select a project"),
  typeOfWork: z.string().min(1, "Please select type of work"),
  taskDescription: z.string().min(1, "Task description is required"),
  hours: z.number().min(1, "Hours must be at least 1").max(24, "Hours cannot exceed 24"),
});

type EntryFormData = z.infer<typeof entrySchema>;

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EntryFormData) => Promise<void>;
  entry?: TimesheetEntry | null;
  date: string;
}

export default function EntryModal({
  isOpen,
  onClose,
  onSubmit,
  entry,
  date,
}: EntryModalProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      projectId: "",
      typeOfWork: "",
      taskDescription: "",
      hours: 4,
    },
  });

  const hours = watch("hours");

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data.projects);
        setWorkTypes(data.workTypes);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    if (entry) {
      reset({
        projectId: entry.projectId,
        typeOfWork: entry.typeOfWork,
        taskDescription: entry.taskDescription,
        hours: entry.hours,
      });
    } else {
      reset({
        projectId: "",
        typeOfWork: "",
        taskDescription: "",
        hours: 4,
      });
    }
  }, [entry, reset]);

  const handleFormSubmit = async (data: EntryFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Failed to submit entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const incrementHours = () => {
    const current = hours || 0;
    if (current < 24) {
      setValue("hours", current + 1);
    }
  };

  const decrementHours = () => {
    const current = hours || 0;
    if (current > 1) {
      setValue("hours", current - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/30"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {entry ? "Edit Entry" : "Add New Entry"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            {/* Project Select */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                Select Project *
                <Info className="w-3.5 h-3.5 text-gray-400" />
              </label>
              <select
                {...register("projectId")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none"
              >
                <option value="">Project Name</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.projectId.message}
                </p>
              )}
            </div>

            {/* Type of Work */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                Type of Work *
                <Info className="w-3.5 h-3.5 text-gray-400" />
              </label>
              <select
                {...register("typeOfWork")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none"
              >
                <option value="">Bug fixes</option>
                {workTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.typeOfWork && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.typeOfWork.message}
                </p>
              )}
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task description *
              </label>
              <textarea
                {...register("taskDescription")}
                rows={4}
                placeholder="Write text here ..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none resize-none"
              />
              <p className="mt-1 text-xs text-gray-400">A note for extra info</p>
              {errors.taskDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.taskDescription.message}
                </p>
              )}
            </div>

            {/* Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours *
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={decrementHours}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  {...register("hours", { valueAsNumber: true })}
                  className="w-16 text-center px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={incrementHours}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {errors.hours && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.hours.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#3B5BDB] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#2f4bb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Saving..."
                  : entry
                  ? "Update entry"
                  : "Add entry"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-gray-600 font-medium hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
