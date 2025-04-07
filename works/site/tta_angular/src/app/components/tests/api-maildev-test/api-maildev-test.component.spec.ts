import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMaildevTestComponent } from './api-maildev-test.component';

describe('ApiMaildevTestComponent', () => {
  let component: ApiMaildevTestComponent;
  let fixture: ComponentFixture<ApiMaildevTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiMaildevTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiMaildevTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
