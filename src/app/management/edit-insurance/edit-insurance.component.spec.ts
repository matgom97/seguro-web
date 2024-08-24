import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuranceComponent } from './edit-insurance.component';

describe('EditInsuranceComponent', () => {
  let component: EditInsuranceComponent;
  let fixture: ComponentFixture<EditInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInsuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
