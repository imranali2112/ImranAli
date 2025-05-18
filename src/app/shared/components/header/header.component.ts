import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
 isMenuOpen = false;
 constructor(private route: ActivatedRoute){}

 @HostListener('window:resize', ['$event'])
 onResize() { 
   if (window.innerWidth >= 1024) {
     this.isMenuOpen = false;
   }
 }

 isOpeon() {
   this.isMenuOpen = !this.isMenuOpen;
 }
 ngOnInit(){
  this.route.fragment.subscribe( fragmentId=>{
    console.log(fragmentId);
    this.navgateTo(fragmentId) 
  })
 }

 navgateTo(selectorId:any){
  document.getElementById(selectorId)?.scrollIntoView({behavior:'smooth'});
  this.isMenuOpen = false;
 }
}
