import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtiUserComponent } from './edti-user.component';

describe('EdtiUserComponent', () => {
  let component: EdtiUserComponent;
  let fixture: ComponentFixture<EdtiUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtiUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdtiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
