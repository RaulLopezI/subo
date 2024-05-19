import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    template: `
    <p-toast></p-toast>
    <router-outlet></router-outlet>
    `,
    standalone: true,
    providers: [
      MessageService
  ],
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, ToastModule]
})
export class AppComponent {

  private mensajesService = inject(MessageService)

  constructor() {
    this.mensajesService.add({ severity: 'error', summary: 'Error', detail: "KOjfolf" });
  }
}
