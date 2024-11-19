import { Task } from './../task.model'; // Importing the Task model to define the structure of tasks
import { TaskService } from './../task.service'; // Importing the service that handles task-related logic
// Importing the Task model to define the structure of tasks
// Importing the service that handles task-related logic
import { Component, OnInit } from '@angular/core'; // Importing Component and OnInit to define the Angular component
import { FormControl } from '@angular/forms'; // Importing FormControl for reactive form handling

@Component({
  selector: 'app-task-list', // The component's selector to identify it in the HTML template
  templateUrl: './task-list.component.html', // The HTML template that defines the view for this component
  styleUrls: ['./task-list.component.css'], // The CSS file for styling the component
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Array to store tasks; each task will conform to the Task model
  taskTitle: FormControl = new FormControl(''); // FormControl to manage the task input field's value
  filter: string = 'all'; // Holds the filter status ('all', 'completed', 'incomplete') to filter the tasks

  constructor(private taskService: TaskService) {} // Injecting TaskService to handle task-related operations

  ngOnInit(): void {
    this.loadTasks(); // Initial method call to load tasks when the component is initialized
  }

  loadTasks(): void {
    // Calling the TaskService method to get the tasks based on the current filter
    this.tasks = this.taskService.filterTasks(this.filter);
  }

  addTask(): void {
    // Method to add a new task when the 'Add Task' button is clicked
    if (this.taskTitle.value.trim()) {
      // Check if the input field is not empty or only whitespace
      this.taskService.addTask(this.taskTitle.value); // Add the task using TaskService
      this.taskTitle.reset(); // Reset the input field after adding the task
      this.loadTasks(); // Reload tasks to include the new task
    }
  }

  deleteTask(id: number): void {
    // Method to delete a task when the delete button is clicked
    this.taskService.deleteTask(id); // Call the TaskService to delete the task by its ID
    this.loadTasks(); // Reload tasks after deletion
  }

  toggleCompletion(id: number): void {
    // Method to toggle the completion state of a task when the checkbox is clicked
    this.taskService.toggleCompletion(id); // Call the TaskService to toggle task completion status
    this.loadTasks(); // Reload tasks after toggling the completion status
  }

  setFilter(status: string): void {
    // Method to set the filter type ('all', 'completed', 'incomplete')
    this.filter = status; // Set the filter state to the selected status
    this.loadTasks(); // Reload tasks based on the new filter
  }
}
