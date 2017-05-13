import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  regexEmail: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  constructor() { }

  // Validation check for special characters
  hasSpecialChars(text) {
    let compare = this.escapeHtml(text)
    let isValid = text == compare

    return {
      valid: isValid,
      message: "Please remove invalid characters (&, <, >, \", ')"
    }
  }

  // Validation check for spaces
  hasSpaces(text) {
    let isValid = !/\s/.test(text.trim())

    return {
      valid: isValid,
      message: "Please remove all spaces"
    }
  }

  // Escape any malicious content
  escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  // Prevent thrown errors by replacing null or undefined with empty string
  replaceNullOrUndefined(text) {
    return text == null || text == undefined ? '' : text
  }

}
