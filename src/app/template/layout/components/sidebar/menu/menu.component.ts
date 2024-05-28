import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
  selector: 'layout-menu',
  standalone: true,
  imports: [
    CommonModule,
    MenuItemComponent
],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  model: any[] = [];

  ngOnInit() {
      this.model = [
          {
              label: 'Productos',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                  {
                      label: 'SUBO',
                      icon: 'pi pi-fw pi-globe',
                      routerLink: ['/listado']
                  },
                  {
                      label: 'Mis Productos',
                      icon: 'pi pi-fw pi-user',
                      routerLink: ['/mis-productos']
                  },
                  {
                      label: 'Mis Pujas',
                      icon: 'pi pi-fw pi-user',
                      routerLink: ['/mis-pujas']
                  },
              ]
          },

      ];
  }

}
