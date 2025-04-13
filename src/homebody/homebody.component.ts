import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-homebody',
  standalone: true,
  imports: [NgClass],
  templateUrl: './homebody.component.html',
  styleUrl: './homebody.component.css'
})
export class HomebodyComponent {
  isOpen=false;
  openDropdown(){
this.isOpen=true;
  }

  closeDropdown(){
    this.isOpen=false;
  }
}
