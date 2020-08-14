import { Component, OnInit, ViewChild, AfterViewInit, ɵConsole } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { stringify } from '@angular/compiler/src/util';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['titlePost', 'tagsPost','emailPost', 'actions'];
  dataSource = new MatTableDataSource();

  emailUser: any;
  emailPost: any;
  userName: any;

  constructor(private postSvc: PostService, public dialog: MatDialog, private afa: AngularFireAuth, private authSvc: AuthService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Cantidad de publicaciones por página:';
    this.dataSource.sort = this.sort;
    
  }

  ngOnInit(): void {
    this.postSvc.getAllPosts().subscribe(posts => (this.dataSource.data = posts));
  
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onDeletePost(post: PostI) {
    this.postSvc.getEmail().then(x => {
      this.emailUser = x;
      this.emailPost = post.email;
      if (this.emailUser == this.emailPost) {
      Swal.fire({
        title: '¿Estás seguro que quieres borrarlo?',
        text: "¡No serás capaz de recuperar la publicación!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar!',
        confirmButtonColor: 'red',
        cancelButtonColor: '#257399',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true

      }).then(result => {
        if (result.value) {
          //Quiere borrar post.
          this.postSvc.deletePostById(post).then(() => {
            Swal.fire('La publicación ha sido borrada.', '', 'success');
          }).catch((error) => {
            Swal.fire('Error', 'Hubo un error al momento de borrar el post.', 'error');
          });
        }
      });
     } else {
       Swal.fire("Modificación imposible","Solo el publicante puede modificarlo.",'error');

    }
    })
  }
  onEditPost(post: PostI) {
    this.postSvc.getEmail().then(x => {
      this.emailUser = x;
      this.emailPost = post.email;
      if (this.emailUser == this.emailPost){
        this.openDialog(post);
      }
      else{
        Swal.fire("Modificación imposible","Solo el publicante puede modificarlo.",'error');
      }
    })
    
  }
  onNewPost() {
    this.openDialog();
  }
  openDialog(post?: PostI): void {
    const config = {
      data:{
          message: post ? 'Editar publicación' : 'Nueva publicación',
          
          content: post
      }
      
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
     

    })
  }
}
