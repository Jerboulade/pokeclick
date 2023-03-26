import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormCardComponent } from './pokemon-form-card.component';

describe('PokemonFormCardComponent', () => {
  let component: PokemonFormCardComponent;
  let fixture: ComponentFixture<PokemonFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonFormCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
