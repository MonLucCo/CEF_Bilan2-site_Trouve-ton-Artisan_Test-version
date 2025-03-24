import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtisansComponent } from './search-artisans.component';

describe('SearchArtisansComponent', () => {
  let component: SearchArtisansComponent;
  let fixture: ComponentFixture<SearchArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchArtisansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
