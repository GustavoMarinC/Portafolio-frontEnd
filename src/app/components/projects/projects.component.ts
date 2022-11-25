import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects : Project[];
  public url: string
  constructor(
    private _projectService: ProjectService
  ) {
    this.projects=[];
    this.url = Global.url
   }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects()
      .subscribe(
        (res)=>{
          console.log(res)
          if(res.projects){
            this.projects = res.projects;
          }
        },
        (error)=>{
          console.log(error)
        }
      )
  }

}
