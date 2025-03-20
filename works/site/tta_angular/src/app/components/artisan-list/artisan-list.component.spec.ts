import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanListComponent } from './artisan-list.component';

describe('ArtisanListComponent', () => {
  let component: ArtisanListComponent;
  let fixture: ComponentFixture<ArtisanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtisanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
