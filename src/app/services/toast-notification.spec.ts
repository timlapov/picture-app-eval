import { TestBed } from '@angular/core/testing';

import { ToastNotification } from './toast-notification';

describe('ToastNotification', () => {
  let service: ToastNotification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastNotification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
