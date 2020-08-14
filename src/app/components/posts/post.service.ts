import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, observable} from 'rxjs';
import {map, finalize} from 'rxjs/operators';
import {PostI} from '../../shared/models/post.interface';
import {FileI} from '../../shared/models/file.interface'
import { AngularFireStorage } from '@angular/fire/storage';
import { stringify } from '@angular/compiler/src/util';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from 'rxjs/internal/scheduler/async';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postsCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private email: any;
  
  private downloadURL: Observable<string>;
  constructor(private afs: AngularFirestore, 
    private storage: AngularFireStorage,  private fireauth: AngularFireAuth, private dialog: MatDialog ) {
     this.postsCollection = afs.collection<PostI>('posts');
  }
      
      public getAllPosts(): Observable<PostI[]>{
       return this.postsCollection.snapshotChanges()
       .pipe(
         map(actions =>
          actions.map( a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            
            return {id, ...data};
          })
          
          )
       );
        
      }
      async getEmailPost(post: PostI){
          console.log(post.email);
      }
      public getOnePost(id: PostI):Observable<PostI>{
        return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
      }
      public deletePostById(post: PostI){
        return this.postsCollection.doc(post.id).delete();
      }
      public updatPostById(post: PostI){
        return this.postsCollection.doc(post.id).update(post);
      }
      async getEmail(){
        const rs = (await this.fireauth.currentUser).email;
        return rs;
      }
      public preAddAndUpdatePost(post: PostI, image: FileI): void{ 
        this.uploadImage(post,image);

      }
     
      public savePost(post: PostI){
          this.getEmail().then(x => {
           this.email = x;
           console.log(this.email) 
           console.log(this.email)
           
           
           var postObj ={
             titlePost: post.titlePost,
             contentPost: post.contentPost,
             imagePost: this.downloadURL,
             fileRef: this.filePath,
             tagsPost: post.tagsPost,
             email: this.email
             
           };
           //TO DO EDITPOST
           //AñADIR USEREMAIL
           if(post.id){
             this.postsCollection.doc(post.id).update(postObj);
             Swal.fire('Actualizado.', '', 'success');
              
           }
            else
            { 
             
             this.postsCollection.add(postObj);
             Swal.fire('La Publicación ha sido creada.', '', 'success').then(x => this.dialog.closeAll());
             
             
            }
         }
      
          )}
         
      private uploadImage(post: PostI, image?:FileI ){
        if(image){
          this.filePath = `images/${image.name}`;
          const fileRef = this.storage.ref(this.filePath);
          const task = this.storage.upload(this.filePath, image);
          task.snapshotChanges()
          .pipe(
            finalize(()=>{
               fileRef.getDownloadURL().subscribe(urlImage => {
                 console.log(urlImage);
                 this.downloadURL = urlImage;
                this.savePost(post);
                 //call addpost()
               });
            })
          ).subscribe();}
          else{
            this.filePath = `images/Logo.jpg`;
            const fileRef = this.storage.ref(this.filePath);
            fileRef.getDownloadURL().subscribe(urlImage => {
              console.log(urlImage);
              this.downloadURL = urlImage;
             this.savePost(post);
              //call addpost()
            });
          }
      }

      public editPostById(post: PostI, newImage?: FileI){
        
        if(newImage){
          this.uploadImage(post, newImage);
        }
        else
        {
           this.postsCollection.doc(post.id).update(post);
           Swal.fire('Actualizado.', '', 'success');
        }
      }

   }


 