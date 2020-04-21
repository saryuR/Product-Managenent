import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private renderer: Renderer2
    ) {
    this.renderer.removeClass(document.body, 'mini-navbar');
  }

  onClickMe() {
    this.renderer.addClass(document.body, 'mini-navbar');
  }
  onClick() {
    this.renderer.removeClass(document.body, 'mini-navbar');
  }
  ngOnInit(): void {
  }
  
}
