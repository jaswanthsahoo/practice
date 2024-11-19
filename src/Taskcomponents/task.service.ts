import { Injectable } from '@angular/core'; // The Injectable decorator is used to mark this class as available for dependency injection
import { Task } from './task.model'; // Importing the Task model to define the structure of task objects

@Injectable({
  providedIn: 'root', // This makes the service available throughout the entire application (singleton instance)
})
export class TaskService {
  private tasks: Task[] = []; // Array to store tasks, using the Task model for each task object

  constructor() {
    this.loadTasks(); // When the service is instantiated, load tasks from localStorage (if available)
  }

  // Method to load tasks from localStorage and assign them to the tasks array
  loadTasks() {
    // Ensure the code runs only in the browser environment (to prevent errors in SSR or non-browser environments)
    if (typeof window !== 'undefined' && window.localStorage) {
      // Get the tasks from localStorage and parse them from JSON format
      const tasks = localStorage.getItem('tasks');
      this.tasks = tasks ? JSON.parse(tasks) : []; // If tasks exist in localStorage, load them, otherwise set as an empty array
    }
  }

  // Method to save tasks to localStorage
  saveTasks(tasks: Task[]): void {
    // Ensure the code runs only in the browser environment (to prevent errors in SSR or non-browser environments)
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save the tasks array to localStorage as a stringified JSON object
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // Method to return the current list of tasks
  getTasks(): Task[] {
    return this.tasks; // Simply returns the current tasks array
  }

  // Method to add a new task to the tasks array
  addTask(title: string): void {
    // Create a new task object
    const newTask: Task = {
      id: this.tasks.length + 1, // Generating an ID based on the current tasks length (not a robust method for ID generation)
      title: title, // Set the task title passed as an argument
      completed: false, // Set the task as not completed initially
    };
    this.tasks.push(newTask); // Add the new task to the tasks array
    this.saveTasks(this.tasks); // Save the updated tasks array to localStorage
  }

  // Method to delete a task by its ID
  deleteTask(id: number): void {
    // Filter out the task with the given ID and update the tasks array
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks(this.tasks); // Save the updated tasks array to localStorage after deletion
  }

  // Method to toggle the completion status of a task
  toggleCompletion(id: number): void {
    // Find the task by its ID
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed; // Toggle the completion status of the task
      this.saveTasks(this.tasks); // Save the updated tasks array to localStorage after toggling the completion status
    }
  }

  // Method to filter tasks based on their completion status ('all', 'completed', 'incomplete')
  filterTasks(status: string): Task[] {
    // Depending on the status passed ('completed', 'incomplete', or 'all'), filter the tasks array
    if (status === 'completed') {
      return this.tasks.filter((task) => task.completed); // Return only tasks that are completed
    }
    if (status === 'incomplete') {
      return this.tasks.filter((task) => !task.completed); // Return only tasks that are incomplete
    }
    return this.tasks; // Return all tasks if the status is 'all'
  }
}
