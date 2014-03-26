(function() {
  describe('Form', function() {
    var getValues, testData;
    getValues = function(data) {
      return FormsJs.Form.Values.get(data);
    };
    testData = [
      {
        type: 'text',
        name: 'lastName',
        value: 'My Last Name',
        validations: [
          {
            type: 'minLength',
            length: 5,
            errorMessage: 'Please enter at least 5 characters'
          }
        ]
      }, {
        type: 'radio',
        name: 'gender',
        value: 'male',
        validations: [
          {
            type: 'required',
            errorMessage: 'Gender is required'
          }
        ]
      }, {
        type: 'text',
        name: 'email',
        validations: [
          {
            type: 'email',
            errorMessage: 'Please enter a valid email address'
          }, {
            type: 'maxLength',
            length: 15,
            errorMessage: 'Email cannot be longer than 15 characters'
          }
        ]
      }, {
        type: 'text',
        name: 'phone',
        validations: [
          {
            type: 'regExp',
            pattern: /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/,
            errorMessage: 'Please enter a valid phone number as ###-###-####'
          }
        ]
      }, {
        type: 'text',
        name: 'phoneType',
        validations: [
          {
            type: 'customMatcher',
            errorMessage: 'Phone type is required when phone is entered',
            matcher: function(value) {
              var phoneValue;
              phoneValue = $('[name=phone]').val();
              if (phoneValue === '') {
                return true;
              } else if (value !== '') {
                return true;
              } else {
                return false;
              }
            }
          }
        ]
      }, {
        type: 'checkbox',
        name: 'interests',
        value: ['Ruby', 'JavaScript']
      }, {
        type: 'select',
        name: 'browser',
        value: 'Chrome',
        validations: [
          {
            type: 'required',
            errorMessage: 'Browser is required'
          }
        ]
      }
    ];
    it('creates a new form object when given an array of data objects', function() {
      var testForm;
      testForm = new FormsJs.Form(testData);
      return expect(testForm.data[0].type).toEqual('text');
    });
    it('populates all form elements with their default values', function() {
      var testForm;
      testForm = new FormsJs.Form(testData);
      loadFixtures('emptyFormFixtures.html');
      testForm.populate();
      expect(getValues(testData[0])).toEqual('My Last Name');
      expect(getValues(testData[1])).toEqual('male');
      expect(getValues(testData[5])).toEqual(['JavaScript', 'Ruby']);
      return expect(getValues(testData[6])).toEqual('Chrome');
    });
    it('validates an empty form as false', function() {
      var testForm;
      testForm = new FormsJs.Form(testData);
      loadFixtures('emptyFormFixtures.html');
      return expect(testForm.isValid()).toBeFalsy();
    });
    it('validates a filled form as true', function() {
      var testForm;
      testForm = new FormsJs.Form(testData);
      loadFixtures('filledFormFixtures.html');
      return expect(testForm.isValid()).toBeTruthy();
    });
    it('gets a list of all the errors from an empty form', function() {
      var testForm;
      testForm = new FormsJs.Form(testData);
      loadFixtures('errorFormFixtures.html');
      return expect(testForm.errors()).toEqual(['Please enter at least 5 characters', 'Gender is required', 'Please enter a valid email address', 'Please enter a valid phone number as ###-###-####', 'Phone type is required when phone is entered', 'Browser is required']);
    });
    return it('serializes a filled form', function() {
      var testForm;
      testForm = new FormsJs.Form(testData);
      loadFixtures('filledFormFixtures.html');
      return expect(testForm.serialize()).toEqual({
        lastName: 'My Last Name',
        gender: 'male',
        email: 'me@example.com',
        phone: '555-555-5555',
        phoneType: 'Cell',
        interests: ['JavaScript', 'Ruby'],
        browser: 'Chrome'
      });
    });
  });

}).call(this);
