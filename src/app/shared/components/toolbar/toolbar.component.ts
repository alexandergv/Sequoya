import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../../components/posts/post.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public appName = 'Sequoya';
  public user: any;
  public showSidebar: boolean;
  public opened = false;

  constructor(public authSvc: AuthService, public postSvc: PostService) {}
  ngOnInit(): void {
    this.handleSidenav();
    this.authSvc.userData.subscribe((user) => {
      if (user.displayName) {
        this.user = user.displayName;
      } else {
        this.user = user.email;
      }
    });
  }

  handleSidenav(){
    this.showSidebar = (window.innerWidth < 610)
  }

  onLogout(): void {
    this.authSvc.logout();
  }

  OnClick() {
    this.opened = !this.opened;
  }


}
