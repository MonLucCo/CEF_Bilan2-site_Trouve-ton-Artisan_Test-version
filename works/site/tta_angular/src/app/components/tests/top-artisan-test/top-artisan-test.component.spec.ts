import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtisanTestComponent } from './top-artisan-test.component';

describe('TopArtisanTestComponent', () => {
  let component: TopArtisanTestComponent;
  let fixture: ComponentFixture<TopArtisanTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopArtisanTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopArtisanTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
