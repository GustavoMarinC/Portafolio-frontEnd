import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public widthSlider: number;
  public anchuraToSlider: number | undefined;

  constructor() { 
    this.widthSlider=0;
  }

  ngOnInit(): void {
  
  }

  cargarSlider(){
    this.anchuraToSlider = 0;
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider = 0;
  }
}
