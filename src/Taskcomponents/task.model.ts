export interface Task {
  id: number; // Unique identifier for each task. Used to distinguish between tasks.
  title: string; // The title or name of the task. This is the main description.
  completed: boolean; // The completion status of the task. Can be true (completed) or false (incomplete).
}
