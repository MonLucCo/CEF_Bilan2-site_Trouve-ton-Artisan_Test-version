import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoCardComponent } from './additional-info-card.component';

describe('AdditionalInfoCardComponent', () => {
  let component: AdditionalInfoCardComponent;
  let fixture: ComponentFixture<AdditionalInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
