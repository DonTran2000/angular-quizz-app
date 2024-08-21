import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiyoComponent } from './piyo.component';

describe('PiyoComponent', () => {
  let component: PiyoComponent;
  let fixture: ComponentFixture<PiyoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiyoComponent]
    });
    fixture = TestBed.createComponent(PiyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
