import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
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
}

