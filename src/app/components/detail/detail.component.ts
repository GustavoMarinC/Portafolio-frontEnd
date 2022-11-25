import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  public url: string;
  public project: any;
  public confirm: boolean;
  constructor(
    private _projectService: ProjectService,
    private _router: Router, 
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url
    this.confirm=false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id = params.id;
      this.getProject(id);
    })
  }

  getProject(id:any){
    this._projectService.getProject(id)
      .subscribe(
        res => {
          if(res.project){
            this.project = res.project
          }
          
        },
        error => {
          console.log(error)
        }
      )
  }
  deleteProject(id:any){
    this._projectService.deleteProject(id)
      .subscribe(
        res => {
          if(res.project){
            this._router.navigate(['/proyectos'])
          }
        },
        err => {
          console.log(err)
        }
      )
  }
  setConfirm(confirm:boolean){
    this.confirm=confirm;
  }
}
