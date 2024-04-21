import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from 'src/app/template/shared/data-access/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let mock: HttpTestingController

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
       imports:[
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule
       ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login and navigate to "listado"', () => {
    const authServiceSpy = spyOn(component.authService, 'login').and.callThrough();
    component.loginForm.controls['email'].setValue('example@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();

    expect(authServiceSpy).toHaveBeenCalled();
   
  });
});
