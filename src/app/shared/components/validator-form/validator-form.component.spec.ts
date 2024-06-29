import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorFormComponent } from './validator-form.component';

describe('ValidatorFormComponent', () => {
  let component: ValidatorFormComponent;
  let fixture: ComponentFixture<ValidatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
