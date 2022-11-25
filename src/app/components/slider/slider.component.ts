import { Component, Input, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
@Input()  anchura: number | undefined

  constructor() { 
    
  }

  ngOnInit(): void {
    var setAnchura = this.anchura
    $(function(){
      $('.galeria').bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: setAnchura
      });
    });
  }

}
