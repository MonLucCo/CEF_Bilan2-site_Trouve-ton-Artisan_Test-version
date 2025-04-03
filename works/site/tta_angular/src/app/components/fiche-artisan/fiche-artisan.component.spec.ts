import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheArtisanComponent } from './fiche-artisan.component';

describe('FicheArtisanComponent', () => {
  let component: FicheArtisanComponent;
  let fixture: ComponentFixture<FicheArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FicheArtisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
