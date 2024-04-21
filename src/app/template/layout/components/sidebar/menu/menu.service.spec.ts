import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { MenuChangeEvent } from '../../../interfaces/menuchangeevent';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit menu change event when onMenuStateChange is called', () => {
    const menuChangeEvent: MenuChangeEvent = { key: 'prueba' };
    let emittedEvent: MenuChangeEvent | undefined;

    service.menuSource$.subscribe(event => {
      emittedEvent = event;
    });

    service.onMenuStateChange(menuChangeEvent);

    expect(emittedEvent).toEqual(menuChangeEvent);
  });

  it('should emit reset event when reset is called', () => {
    let emittedReset: boolean | undefined;

    service.resetSource$.subscribe(reset => {
      emittedReset = true;
    });

    service.reset();

    expect(emittedReset).toBeTrue();
  });
});
