namespace('FormsJs.Form')

class FormsJs.Form.Populator

  setValue = (data) ->
    $("[name='#{data.name}']").val(data.value)

  setChecked = (data) ->
    $("[name='#{data.name}'][value='#{data.value}']").prop('checked', true)

  setAllChecked = (data) ->
    if _.isArray(data.value)
      value = data.value
    else
      value = [data.value]
    $("[name='#{data.name}']").val(value)

  @populate: (data) ->
    switch data.type
      when FormsJs.Form.InputTypes.TEXT then setValue(data)
      when FormsJs.Form.InputTypes.RADIO then setChecked(data)
      when FormsJs.Form.InputTypes.CHECKBOX then setAllChecked(data)
      when FormsJs.Form.InputTypes.SELECT then setValue(data)