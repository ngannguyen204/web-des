import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionViewComponent } from './fashion-view.component';

describe('FashionViewComponent', () => {
  let component: FashionViewComponent;
  let fixture: ComponentFixture<FashionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
