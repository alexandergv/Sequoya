import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public opened = true;
  public logo: string;
  constructor() { }
  
  ngOnInit(): void {
    this.logo = "https://firebasestorage.googleapis.com/v0/b/sequoyahyperion.appspot.com/o/images%2FLogo2.png?alt=media&token=dcac4b8e-e88e-47a8-9b45-abe9874980b5";
  }

}
