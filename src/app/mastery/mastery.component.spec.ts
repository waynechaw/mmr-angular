import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryComponent } from './mastery.component';

describe('MasteryComponent', () => {
  let component: MasteryComponent;
  let fixture: ComponentFixture<MasteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasteryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
