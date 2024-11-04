import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenedorProductosComponent } from './mantenedor-productos.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('MantenedorProductosComponent', () => {
  let component: MantenedorProductosComponent;
  let fixture: ComponentFixture<MantenedorProductosComponent>;

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
    fixture = TestBed.createComponent(MantenedorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
