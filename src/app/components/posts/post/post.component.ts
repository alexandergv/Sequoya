import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import{PostService} from '../post.service';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

 
  public post$ : Observable<PostI>;
  constructor(private route: ActivatedRoute, private postSvc: PostService) { }

  ngOnInit() {
    const Idpublicacion = this.route.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(Idpublicacion);
  }

}
