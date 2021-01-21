
import FdInput from './fd-input'
import FdDatePicker from './fd-date-picker'
import FdSelect from './fd-select'
import FdCheckboxGroup from './fd-checkbox-group'
import FdRadioGroup from './fd-radio-group'
import FdDiv from './fd-div'
import FdLabel from './fd-label'
import FdCascader from './fd-cascader'
import FdCard from './fd-card'
import FdDialog from './fd-dialog'
import fdFileUploader from './fd-file-uploader'
import fdRichText from './fd-rich-text'
import fdSlotComp from './fd-slot-comp'
import fdTree from './fd-tree'

const components = [
  FdCascader,
  FdLabel,
  FdCheckboxGroup,
  FdSelect,
  FdDatePicker,
  FdDiv,
  FdRadioGroup,
  FdInput,
  FdCard,
  FdDialog,
  fdFileUploader,
  fdRichText,
  fdSlotComp,
  fdTree
]

const dic = {}
components.forEach(component => {
  dic[component.name] = component
})

export default dic
