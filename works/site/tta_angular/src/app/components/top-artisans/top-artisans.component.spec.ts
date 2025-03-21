import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtisansComponent } from './top-artisans.component';

describe('TopArtisansComponent', () => {
  let component: TopArtisansComponent;
  let fixture: ComponentFixture<TopArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopArtisansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
