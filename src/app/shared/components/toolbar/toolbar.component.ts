import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../../components/posts/post.service';
import {MenuItem} from '../../../shared/models/menuItem.interface';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public appName = 'Sequoya';
  public user: any;

  constructor(public authSvc: AuthService, public postSvc: PostService) { 
   }
 
   

    
  ngOnInit(): void {
    this.authSvc.userData.subscribe( user =>{
      if(user.displayName){
        this.user = user.displayName;
      }
      else{
        this.user = user.email;
      }
      
    })
    
  }

  onLogout(): void{
    this.authSvc.logout();
    
  }
  onToggleSidenav(){
    
  }

}
