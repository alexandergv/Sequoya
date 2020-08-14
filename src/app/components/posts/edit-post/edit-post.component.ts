import { Component, OnInit, Input } from '@angular/core'; 
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {PostI} from '../../../shared/models/post.interface';
import { PostService } from '../post.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  private image: any;
  private imageOriginal: any;
  public imageName: any;

  @Input() post: PostI;

  constructor(private postSvc: PostService) { }

  public editPostForm = new FormGroup({
      id: new FormControl('', Validators.required),
      titlePost: new FormControl('',Validators.required),
      contentPost: new FormControl('',Validators.required),
      tagsPost: new FormControl('',Validators.required),
      imagePost: new FormControl('',Validators.required)
  

  });
  ngOnInit(): void { 
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.imageName = this.post.imagePost;
    this.initValuesForm();
  }
  editPost(post: PostI){
    console.log('img', this.image)
    console.log('original', this.imageOriginal);

    if(this.image == this.imageOriginal){
        post.imagePost = this.imageOriginal;
        this.postSvc.editPostById(post);
        //call method(post)
    }
    else{
      this.postSvc.editPostById(post, this.image);
      //call method(post, this.image)
    }
    
  }
  
  handleImage(event: any): void{
    this.image = event.target.files[0];
    this.imageName = event.target.files[0].name;
    console.log(this.image);
    
  }

  private initValuesForm(): void{
     this.editPostForm.patchValue({
        id: this.post.id,
        titlePost: this.post.titlePost,
        contentPost: this.post.contentPost,
        tagsPost: this.post.tagsPost
     })
  }

}
