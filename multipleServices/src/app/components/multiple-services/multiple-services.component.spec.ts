import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleServicesComponent } from './multiple-services.component';

describe('MultipleServicesComponent', () => {
  let component: MultipleServicesComponent;
  let fixture: ComponentFixture<MultipleServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
