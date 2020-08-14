import { Injectable, ɵConsole } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import {FileI} from  '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<firebase.User>;
  private filePath: string;

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.userData = afAuth.authState;
  }

    registerUser(email, pass){
      console.log(email,pass);
      return new Promise <any> ((resolve, reject)=>{
        this.afAuth.createUserWithEmailAndPassword(email,pass)
        .then( userData => {resolve(userData);},
        err => reject(err));
      })
      
    }


  async loginByEmail(user: UserI) {
    const { email, password } = user;
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      return res;
    } catch (error) {
      return error;
    }
  }

  logout() {
    this.afAuth.signOut();
  }

  async saveUserProfile(user: UserI, image?: any): Promise<any> {
    (await this.afAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    }).then(() => {console.log('User updated',user.displayName);
    Swal.fire('Información guardada.', '', 'success').then(res =>(location.reload()))
    
  })
      .catch(err => console.log('error', err));
  }
  preSaveUserProfile(user: UserI, image?: FileI): void{
    if(image){
    this.uploadImage(user, image);
    }
    else{
      this.saveUserProfile(user);
    }
     
  }
  private uploadImage(user: UserI, image:FileI): void{
    
      this.filePath = `images/${image.name}`;
     
      const fileRef = this.storage.ref(this.filePath);
      const taks = this.storage.upload(this.filePath, image);

      taks.snapshotChanges()
      .pipe(
        finalize( ()=> {
          fileRef.getDownloadURL().subscribe(urlImage => {
           
            console.log(urlImage);
            user.photoURL = urlImage;
            this.saveUserProfile(user); 
          })
        })
      ).subscribe();
  }
}

