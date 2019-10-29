import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillNgComponent } from './mill-ng.component';

describe('MillNgComponent', () => {
  let component: MillNgComponent;
  let fixture: ComponentFixture<MillNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
