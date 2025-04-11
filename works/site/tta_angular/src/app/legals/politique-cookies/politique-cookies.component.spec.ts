import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueCookiesComponent } from './politique-cookies.component';

describe('PolitiqueCookiesComponent', () => {
  let component: PolitiqueCookiesComponent;
  let fixture: ComponentFixture<PolitiqueCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolitiqueCookiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitiqueCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
