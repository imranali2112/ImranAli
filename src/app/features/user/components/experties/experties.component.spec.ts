import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiesComponent } from './experties.component';

describe('ExpertiesComponent', () => {
  let component: ExpertiesComponent;
  let fixture: ComponentFixture<ExpertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
