import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchesPublicsComponent } from './marches-publics.component';

describe('MarchesPublicsComponent', () => {
  let component: MarchesPublicsComponent;
  let fixture: ComponentFixture<MarchesPublicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarchesPublicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchesPublicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
