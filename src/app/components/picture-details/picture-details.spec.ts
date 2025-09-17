import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDetails } from './picture-details';

describe('PictureDetails', () => {
  let component: PictureDetails;
  let fixture: ComponentFixture<PictureDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
