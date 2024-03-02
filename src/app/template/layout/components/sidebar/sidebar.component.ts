import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../service/layout.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'layout-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent
  ],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  public layoutService = inject(LayoutService);
  public el = inject(ElementRef);
}
