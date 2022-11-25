import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService]
})
export class CreateComponent implements OnInit {
  
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>
  public setProject : any
  public url:string
  constructor(
    private _projectServices:ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = 'Creando proyecto';
    this.project = new Project('','','','',2019,'','');
    this.status = '';
    this.filesToUpload = []
    this.url=Global.url;
  }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    console.log('form', form)
    this._projectServices.saveProject(this.project).subscribe(
      (res)=>{
        console.log(res)
        if(res.project){
          

          this._uploadService.makeFileRequest(Global.url+'upload-image/'+res.project._id,[],this.filesToUpload,'image')
            .then(
              (result:any)=>{
                this.setProject = result.project;
                console.log(result)
                this.status = 'success';
                form.reset();
              }
            )
         
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
