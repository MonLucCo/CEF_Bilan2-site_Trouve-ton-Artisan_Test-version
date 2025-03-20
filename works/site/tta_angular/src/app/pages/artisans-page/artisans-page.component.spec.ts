import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisansPageComponent } from './artisans-page.component';

describe('ArtisanListComponent', () => {
  let component: ArtisansPageComponent;
  let fixture: ComponentFixture<ArtisansPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtisansPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArtisansPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
