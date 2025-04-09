import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindArtisanTestComponent } from './find-artisan-test.component';

describe('FindArtisanTestComponent', () => {
  let component: FindArtisanTestComponent;
  let fixture: ComponentFixture<FindArtisanTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindArtisanTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindArtisanTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
