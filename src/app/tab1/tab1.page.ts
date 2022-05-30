import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  taskName;
  taskDescription;
  taskDueDate;
  taskObject;

  todoList = [];

  today: number = Date.now();

  constructor() {}

  verificarNull() {
    if (
      this.taskName == null ||
      this.taskDescription == null ||
      this.taskDueDate == null
    ) {
      return true;
    }
    return false;
  }

  delete(index) {
    this.todoList.splice(index, 1);
  }

  addTask() {
    if (!this.verificarNull()) {
      this.taskObject = {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskDueDate: new Date(this.taskDueDate),
      };
      this.todoList.push(this.taskObject);
    }
  }
}
