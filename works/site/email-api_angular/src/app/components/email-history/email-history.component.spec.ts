import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHistoryComponent } from './email-history.component';

describe('EmailHistoryComponent', () => {
  let component: EmailHistoryComponent;
  let fixture: ComponentFixture<EmailHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
