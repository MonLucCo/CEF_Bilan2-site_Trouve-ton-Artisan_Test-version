import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactArtisanComponent } from './contact-artisan.component';

describe('ContactArtisanComponent', () => {
  let component: ContactArtisanComponent;
  let fixture: ComponentFixture<ContactArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactArtisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
