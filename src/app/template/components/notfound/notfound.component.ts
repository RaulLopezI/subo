import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'notfound',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule
    ],
    templateUrl: './notfound.component.html'

})
export class NotfoundComponent { }