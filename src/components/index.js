import CustomForm from './CustomForm';
import ModalDialog from './ModalDialog';
import FormDialog from './FormDialog';
import CustomTable from './CustomTable';
import Pagination from './Pagination';
import SvgIcon from './SvgIcon';
import InputNumber from './InputNumber';
import ChooseIcon from './ChooseIcon';

const components = [
  CustomForm,
  ModalDialog,
  FormDialog,
  CustomTable,
  Pagination,
  SvgIcon,
  InputNumber,
  ChooseIcon,
];

export default {
  install(app) {
    components.map((item) => {
      app.use(item);
    });
  },
};
