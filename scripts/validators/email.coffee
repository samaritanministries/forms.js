namespace('FormsJs.Validator')

class FormsJs.Validator.Email

  EMAILREGEXP: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i

  constructor: (@options) ->

  isValid: (value) ->
    @EMAILREGEXP.test(value) or value is ''
