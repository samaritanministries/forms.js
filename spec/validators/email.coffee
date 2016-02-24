describe 'FormsJs.Validator.Email', ->
  validation = { type: 'email', errorMessage: 'Please enter a valid email address' }

  newValidator = (validation) ->
    new FormsJs.Validator.Email(validation)

  it 'returns false when an email is expected but does not match', ->
    emailValidator = newValidator(validation)
    expect(emailValidator.isValid('example.com')).toBeFalsy()

  it 'returns true when an email uses a top-level domain', ->
    emailValidator = newValidator(validation)
    expect(emailValidator.isValid('me@my.family')).toBeTruthy()
    expect(emailValidator.isValid('me@software.engineering')).toBeTruthy()
    expect(emailValidator.isValid('me@computer.software')).toBeTruthy()
    expect(emailValidator.isValid('me@the.management')).toBeTruthy()

  it 'returns true when an email is expected and matches', ->
    emailValidator = newValidator(validation)
    expect(emailValidator.isValid('me@example.com')).toBeTruthy()

  it 'returns true when an email is blank and not required', ->
    emailValidator = newValidator(validation)
    expect(emailValidator.isValid('')).toBeTruthy()
