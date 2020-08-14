import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserI } from '../../../shared/models/user.interface';
import { FileI } from '../../../shared/models/file.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public image: FileI;
    public currentImage: any;
    public guarda: string;
     

  constructor(private authSvc: AuthService) { 
    this.currentImage = 'https://picsum.photos/id/113/150/150';
  }

  public profileForm = new FormGroup({
      displayName: new FormControl( '',Validators.required),
      email: new FormControl ({value: '', disabled:true}, Validators.required),
      photoUrl: new FormControl ('', Validators.required)
  });

  ngOnInit(): void {
    
    this.authSvc.userData.subscribe( user =>{
      
      this.initValuesForm(user);
    })
  }

    private initValuesForm(user: UserI): void{
      if( user.photoURL ) {
        this.currentImage = user.photoURL;
      }
      this.profileForm.patchValue({
        displayName: user.displayName, 
        email: user.email,
      });
    
    }
    public onSaveUser(user: UserI){
      
      this.authSvc.preSaveUserProfile(user,this.image)
;    }
    public handleImage(image: FileI): void{
      this.image = image;
      
      this.guarda = "Presiona guardar para confirmar los cambios."
   
    }
}