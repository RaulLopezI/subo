import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from 'src/app/template/shared/data-access/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['registro']);
   
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
       
        FormBuilder
      ]
    }).compileComponents();

   
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.registro and navigate to "listado" on form submit', () => {
    const formData = { nombre: 'Test', email: 'test@example.com', password: 'password123' };
    const routerSpy = spyOn(router, 'navigate')
    component.registroForm.patchValue(formData);

    authServiceSpy.registro.and.returnValue(of(null));

    component.onSubmit();

    expect(authServiceSpy.registro).toHaveBeenCalledWith(formData);
    expect(routerSpy).toHaveBeenCalledWith(['listado']);
  });
});
  