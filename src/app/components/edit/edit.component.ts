import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: any;
  public status: string;
  public filesToUpload: Array<File>
  public setProject : any
 public url:string
  constructor(
    private _projectServices:ProjectService,
    private _uploadService: UploadService,
    private _router: Router, 
    private _route: ActivatedRoute
  ) {

    this.title = 'Creando proyecto';
    this.status = '';
    this.filesToUpload = [];
    this.url = Global.url;
   }

   ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id = params.id;
      this.getProject(id);
    })
  }

  getProject(id:any){
    this._projectServices.getProject(id)
      .subscribe(
        res => {
          this.project = res.project
        },
        error => {
          console.log(error)
        }
      )
  }


  onSubmit(form:any){
    this._projectServices.upDateProject(this.project).subscribe(
      (res)=>{
        if(res.project){
          if(this.filesToUpload.length>=1){
            this._uploadService.makeFileRequest(Global.url+'upload-image/'+res.project._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
                this.setProject = result.project;
                this.status = 'success';
              })
          }else{
            this.setProject = res.project;
            this.status = 'success';
          }
        }else{
          this.status = 'failed';
        }
      },
      (error)=>{
        console.log(error)
      }
    );
  }
  fileChangeEvent(fileInput:any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
