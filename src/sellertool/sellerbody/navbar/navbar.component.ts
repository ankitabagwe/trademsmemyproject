import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router){}

  ngOnInit(): void {
    // this.leadmanager();
    // this.buyleads();
    // this.product();
   
  }

  
  // leadmanager(){
  // this.router.navigateByUrl("app-sellerbody/leadmanager");
  // }

  // buyleads(){
  //   this.router.navigateByUrl("app-sellerbody/buyleads");
  // }

  // product(){
  //   this.router.navigateByUrl("app-sellerbody/products");
  // }
}
