import CustomForm from './CustomForm';
import ModalDialog from './ModalDialog';
import FormDialog from './FormDialog';
import CustomTable from './CustomTable';
import Pagination from './Pagination';
import SvgIcon from './SvgIcon';

const components = [CustomForm, ModalDialog, FormDialog, CustomTable, Pagination, SvgIcon];

export default {
  install(app) {
    components.map((item) => {
      app.use(item);
    });
  },
};
