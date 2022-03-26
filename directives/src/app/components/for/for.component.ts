import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for',
  templateUrl: './for.component.html',
  styleUrls: ['./for.component.css'],
})
export class ForComponent implements OnInit {
  courses: string[];
  students: any[];
  color: string;
  fontSize: string;
  useTdata: boolean;
  classObj: Object;

  constructor() {
    this.useTdata = true;
    this.classObj = {
      tdata: this.useTdata,
    };
    this.color = 'green';
    this.fontSize = '40';
    this.courses = ['Angular', 'React', 'Node'];
    this.students = [
      {
        fName: 'John',
        lName: 'Doe',
        score: 90,
      },
      {
        fName: 'Bob',
        lName: 'Doge',
        score: 100,
      },
    ];
  }

  ngOnInit(): void {}
}
