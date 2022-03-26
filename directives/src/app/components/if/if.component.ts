import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-if',
  templateUrl: './if.component.html',
  styleUrls: ['./if.component.css'],
})
export class IfComponent implements OnInit {
  x: number;
  y: number;
  s: string;

  constructor() {
    this.x = 10;
    this.y = 20;
    this.s = 'success';
  }

  myFunc() {
    return true;
  }

  ngOnInit(): void {}
}
