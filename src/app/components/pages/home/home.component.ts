import { Component, OnInit } from '@angular/core';
import {PostService} from '../../posts/post.service';
import {PostI} from '../../../shared/models/post.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public logo:{
    logo: string;
  }={logo:'https://i.ibb.co/WBQ89Zh/Logo1.png'};


    public posts$ :Observable<PostI[]>

    constructor( private PostSvc: PostService){
       
    }

  ngOnInit(): void {
     this.posts$ = this.PostSvc.getAllPosts();
     
  }

}
