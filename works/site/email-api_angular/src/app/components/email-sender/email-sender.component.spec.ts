import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSenderComponent } from './email-sender.component';

describe('EmailSenderComponent', () => {
  let component: EmailSenderComponent;
  let fixture: ComponentFixture<EmailSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailSenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
