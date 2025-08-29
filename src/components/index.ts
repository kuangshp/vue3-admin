import CustomForm from './CustomForm';
import CustomTable from './CustomTable';
import Pagination from './Pagination';
import SvgIcon from './SvgIcon';
import InputNumber from './InputNumber';
import ChooseIcon from './ChooseIcon';
import CustomDateRangePicker from './CustomDateRangePicker';
import AmountRangeInput from './AmountRangeInput';
import CustomModal from './CustomModal';
import CustomUpload from './CustomUpload';
import ImportExcelDialog from './ImportExcelDialog';
import type { App } from 'vue';

const components = [
  CustomForm,
  CustomTable,
  Pagination,
  SvgIcon,
  InputNumber,
  ChooseIcon,
  CustomDateRangePicker,
  AmountRangeInput,
  CustomModal,
  CustomUpload,
  ImportExcelDialog,
];

export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item);
    });
  },
};
