import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryItemComponent } from './mastery-item.component';

describe('MasteryItemComponent', () => {
  let component: MasteryItemComponent;
  let fixture: ComponentFixture<MasteryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasteryItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasteryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
