import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanDetailComponent } from './artisan-detail.component';

describe('ArtisanDetailComponent', () => {
  let component: ArtisanDetailComponent;
  let fixture: ComponentFixture<ArtisanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtisanDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
