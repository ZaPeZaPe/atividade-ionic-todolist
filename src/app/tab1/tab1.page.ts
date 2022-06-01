import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  hoje: Date = new Date();
  pipe = new DatePipe('en-US');
  hojeString: string = this.pipe.transform(this.hoje, 'dd/MM/yyyy');

  taskName;
  taskDescription;
  taskDueDate;
  taskObject;

  clicou = false;
  indexxx = -1;

  todoList = [];

  today: number = Date.now();

  constructor() {}

  verificarNull() {
    if (
      this.taskName != null &&
      this.taskDescription != null &&
      this.taskDueDate != null
    ) {
      return false;
    }
    return true;
  }

  validarData(data: Date) {
    var dataAgendadaString = this.pipe.transform(new Date(data), 'dd/MM/yyyy');
    var dataAgenParticionada = dataAgendadaString.split('/');
    var dataHojeParticionada = this.hojeString.split('/');
    if (this.calcularData(dataHojeParticionada, dataAgenParticionada)) {
      console.log('Parou');
      return false;
    }
    return true;
  }

  calcularData(dataHoje: string[], dataAgen: string[]) {
    var diaHoje: number = Number(dataHoje[0]);
    var mesHoje: number = Number(dataHoje[1]);
    var anoHoje: number = Number(dataHoje[2]);
    var diaAgen: number = Number(dataAgen[0]);
    var mesAgen: number = Number(dataAgen[1]);
    var anoAgen: number = Number(dataAgen[2]);
    var qtdDias: number;

    if (anoHoje - anoAgen == -1) {
      if (!(mesHoje - mesAgen <= 11 && mesHoje - mesAgen >= 9)) {
        return true;
      }
    } else if (anoHoje - anoAgen != 0) {
      return true;
    }

    qtdDias = diaAgen - diaHoje;
    qtdDias += (mesAgen - mesHoje) * 30;

    if (qtdDias > 90 || qtdDias <= 0) {
      return true;
    }
    return false;
  }

  delete(index) {
    this.indexxx = index;
    this.clicou = true;
    this.taskName = this.todoList[index].taskName;
    this.taskDueDate = this.todoList[index].taskDueDate;
    this.taskDescription = this.todoList[index].taskDescription;
    this.todoList.splice(index, 1);
  }

  addTask() {
    if (
      !this.verificarNull() &&
      this.validarData(new Date(this.taskDueDate)) &&
      !this.checkTask()
    ) {
      this.taskObject = {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskDueDate: new Date(this.taskDueDate),
      };
      this.clicou = false;
      this.todoList.push(this.taskObject);
    }
  }

  edit(index) {
    this.clicou = true;
  }

  checkTask() {
    for (let attribute of this.todoList) {
      if (
        attribute.taskName == this.taskName ||
        attribute.taskDueDate == new Date(this.taskDueDate) ||
        attribute.taskDescription == this.taskDescription
      ) {
        return true;
      }
    }
    return false;
  }
}
