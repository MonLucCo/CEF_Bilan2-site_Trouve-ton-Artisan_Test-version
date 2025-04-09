import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindArtisanComponent } from './find-artisan.component';

describe('FindArtisanComponent', () => {
  let component: FindArtisanComponent;
  let fixture: ComponentFixture<FindArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindArtisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
