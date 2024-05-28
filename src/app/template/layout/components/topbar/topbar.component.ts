import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  items!: MenuItem[];
  public router = inject(Router);
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) { }

  out() {
    console.log("ñfjmkm");

    localStorage.removeItem("token")
    localStorage.removeItem("idUser")
    this.router.navigate(['auth'])
  }
}
