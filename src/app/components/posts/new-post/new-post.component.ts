import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {PostI} from '../../../shared/models/post.interface';
import { PostService } from '../post.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  private image: any;
  public imageName: any;
  public ref: string;


  constructor(private postSvc: PostService,private afAuth: AngularFireAuth) { }


  
  public newPostForm = new FormGroup({
    titlePost: new FormControl('',Validators.required),
    contentPost: new FormControl('',Validators.required),
    tagsPost: new FormControl('',Validators.required),
    imagePost: new FormControl('',Validators.required)

  });

  ngOnInit(): void {
  }
  async preDeletePost(){
    await this.postSvc.getEmail();
  }

  
  addNewPost(data: PostI){
    this.postSvc.preAddAndUpdatePost(data, this.image);
  }

  handleImage(event: any): void{
    this.image = event.target.files[0];
    
    this.imageName = event.target.files[0].name;
    
    
  }

}
