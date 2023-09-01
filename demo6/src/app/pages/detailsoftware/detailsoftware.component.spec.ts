import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsoftwareComponent } from './detailsoftware.component';

describe('DetailsoftwareComponent', () => {
  let component: DetailsoftwareComponent;
  let fixture: ComponentFixture<DetailsoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsoftwareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
