import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarroComponent } from './carro.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('CarroComponent', () => {
  let component: CarroComponent;
  let fixture: ComponentFixture<CarroComponent>;

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
    fixture = TestBed.createComponent(CarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
