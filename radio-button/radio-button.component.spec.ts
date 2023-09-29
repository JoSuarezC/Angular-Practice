import 'zone.js';
import 'zone.js/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { first } from 'rxjs';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('RadioButtonComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioButtonComponent ]
    })
  });

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(RadioButtonComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('It should change its checked state on click. Only the first time', () => {
    const fixture = TestBed.createComponent(RadioButtonComponent);
    const component = fixture.debugElement.componentInstance;
    component.id = 'testID';
    component.label = 'Test Labelling';
    component.name = 'testGroup';
    component.value = 'testLabelling';

    // Should start as false so we can see the state changing.
    component.checked = false;

    fixture.detectChanges();

    const radioElement = fixture.debugElement.nativeElement.querySelector('input');
    const checkedValue = radioElement.checked;

    component.change
    .pipe(first())
    .subscribe(
      (isChecked: boolean) => expect(isChecked).toBe(!checkedValue)
    );

    radioElement.click();
    expect(radioElement.checked).toBe(!checkedValue);
  });
});
