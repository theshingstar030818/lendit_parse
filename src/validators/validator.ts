/*
  Custom validators to use everywhere.
*/
import {FormControl, FormGroup} from '@angular/forms';
// SINGLE FIELD VALIDATORS
export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

// FORM GROUP VALIDATORS
export function matchingStrings(itemKey: string, confirmItemKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let item = group.controls[itemKey];
    let confirmItem = group.controls[confirmItemKey];
    if (item.value !== confirmItem.value) {
      return {
        mismachedStrings: true
      };
    }
  }
}