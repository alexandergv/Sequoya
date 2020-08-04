import { Component, OnInit } from '@angular/core';
import {PostService} from '../../posts/post.service';
import {PostI} from '../../../shared/models/post.interface';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public logo:{
    logo: string;
  }={logo:'https://i.ibb.co/f1S94Sk/Logo.png'};

  public post: {
    titlePost: string;
    contentPost: string;
    imagePost: string;
    id: string;
  }[]= [
    {
      id: '1',
      titlePost: 'Post One',
      contentPost: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

      `,
      imagePost:'https://i.picsum.photos/id/1084/200/300.jpg?hmac=JQMQbKvpN6_d6r-fiuOEYe1Dz6f2gfGIkTvsx0nLJUQ'
    },
   {
      id: '2',
      titlePost: 'Post Two',
      contentPost: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

      `,
      imagePost:'https://i.picsum.photos/id/1084/200/300.jpg?hmac=JQMQbKvpN6_d6r-fiuOEYe1Dz6f2gfGIkTvsx0nLJUQ'
    }];


  ngOnInit(): void {
  }

}
