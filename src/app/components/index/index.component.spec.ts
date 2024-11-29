import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { UserService } from '../../services/usuario-service/usuario.service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  // Mock para UserService
  const mockUserService = {
    getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({ id: 1, name: 'Test User' }),
    logout: jasmine.createSpy('logout'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComponent, RouterTestingModule, HttpClientModule], // Usa `imports` para componentes standalone
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: PLATFORM_ID, useValue: 'browser' }, // Simula el entorno navegador
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentUser on ngOnInit', () => {
    component.ngOnInit();
    expect(mockUserService.getCurrentUser).toHaveBeenCalled();
    expect(component.currentUser).toEqual({ id: 1, name: 'Test User' });
  });

  it('should call logout and reset currentUser', () => {
    component.logout();
    expect(mockUserService.logout).toHaveBeenCalled();
    expect(component.currentUser).toBeNull();
  });

  it('should initialize the carousel with the first slide active', () => {
    const mockSlides = [
      { classList: { add: jasmine.createSpy('add'), remove: jasmine.createSpy('remove') } },
      { classList: { add: jasmine.createSpy('add'), remove: jasmine.createSpy('remove') } },
    ];

    spyOn(component['el'].nativeElement, 'querySelectorAll').and.returnValue(mockSlides);

    component.ngAfterViewInit();

    expect(mockSlides[0].classList.add).toHaveBeenCalledWith('active');
  });
});
