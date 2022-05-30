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

  addTask() {
    this.taskObject = {
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      taskDueName: new Date(this.taskDueDate),
    };
    console.log(this.taskObject);
    this.todoList.push(this.taskObject);
  }
}
