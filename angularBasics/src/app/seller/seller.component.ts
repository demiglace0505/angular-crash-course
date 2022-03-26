import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  sellers: string[];
  hide: boolean;

  constructor() {
    this.sellers = ['BestBuy', 'Apple', 'Amazon'];
    this.hide = true;
  }

  public getSellers(): string[] {
    return this.sellers;
  }

  toggle() {
    this.hide = !this.hide;
  }

  ngOnInit(): void {}
}
