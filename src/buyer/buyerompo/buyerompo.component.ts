import { Component } from '@angular/core';

@Component({
  selector: 'app-buyerompo',
  standalone: true,
  imports: [],
  templateUrl: './buyerompo.component.html',
  styleUrl: './buyerompo.component.css'
})
export class BuyerompoComponent {
  products = [
    {
      title: 'Gents Silver Kada God Name',
      price: 'Rs 50 / Gram',
      seller: 'By: Maruti Silver Ornaments',
      imageUrl: 'assets/images/kada1.jpg'
    },
    {
      title: 'GENTS 2 TON SILVER KADA',
      price: 'Rs 53 / Gram',
      seller: 'By: OM Silver Ornaments',
      imageUrl: 'assets/images/kada2.jpg'
    },
    {
      title: 'Mahakal Rudrax Kada',
      price: 'Rs 15 / Piece',
      seller: 'By: MV Manufacture',
      imageUrl: 'assets/images/kada3.jpg'
    }
  ];

}
