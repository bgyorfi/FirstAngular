import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularFilmsComponent } from './popularfilms.component';

describe('PopularfilmsComponent', () => {
  let component: PopularFilmsComponent;
  let fixture: ComponentFixture<PopularFilmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularFilmsComponent]
    });
    fixture = TestBed.createComponent(PopularFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
