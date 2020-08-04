import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public post:{
    id:string;
    titlePost:string;
    contentPost:string;
    imagePost: string;
  }={
    id:'1',
    titlePost: 'Post One',
    contentPost: 'Hola mundo',
    imagePost:'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
  }

  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
    this.post.id = this.route.snapshot.params.id;

  }

}
