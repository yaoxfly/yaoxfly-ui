
import FdInput from './fd-input'
import FdDatePicker from './fd-date-picker'
import FdSelect from './fd-select'
import FdCheckboxGroup from './fd-checkbox-group'
import FdRadioGroup from './fd-radio-group'
import FdDiv from './fd-div'
import FdLabel from './fd-label'
import FdCascader from './fd-cascader'
import FdCard from './fd-card'

const components = [
  FdCascader,
  FdLabel,
  FdCheckboxGroup,
  FdSelect,
  FdDatePicker,
  FdDiv,
  FdRadioGroup,
  FdInput,
  FdCard
]

const dic = {}
components.forEach(component => {
  dic[component.name] = component
})

export default dic
