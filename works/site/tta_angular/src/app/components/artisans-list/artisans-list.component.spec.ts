import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisansListComponent } from './artisans-list.component';

describe('ArtisansListComponent', () => {
  let component: ArtisansListComponent;
  let fixture: ComponentFixture<ArtisansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtisansListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
