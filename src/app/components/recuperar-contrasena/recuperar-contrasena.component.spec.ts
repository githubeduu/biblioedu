import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('RecuperarContrasenaComponent', () => {
  let component: RecuperarContrasenaComponent;
  let fixture: ComponentFixture<RecuperarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { params: of({ id: 123 }) } 
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
