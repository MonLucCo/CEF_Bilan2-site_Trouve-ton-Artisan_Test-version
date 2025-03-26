import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArtisansComponent } from './category-artisans.component';

describe('CategoryArtisansComponent', () => {
  let component: CategoryArtisansComponent;
  let fixture: ComponentFixture<CategoryArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryArtisansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
