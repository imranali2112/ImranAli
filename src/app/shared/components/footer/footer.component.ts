import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
constructor(private route: ActivatedRoute){}

 ngOnInit(){
  this.route.fragment.subscribe( fragmentId=>{
    console.log(fragmentId);
    this.navgateTo(fragmentId) 
  })
 }

 navgateTo(selectorId:any){
  document.getElementById(selectorId)?.scrollIntoView({behavior:'smooth'});
  }
}
