import Modal from "react-modal";
import { customStyles } from "./styleSubfrm";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const subFrmYesNoDialog = ({ isOpen, onClose, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
      <div className="text-right mb-2 cursor-pointer">
        <CloseIcon onClick={onClose} />
      </div>
      <div className="text-center">
        <Typography variant="h6">{title}</Typography>
        <div className="flex">
          <Button>Xác nhận</Button>
          <Button>Hủy</Button>
        </div>
      </div>
    </Modal>
  );
};

export default subFrmYesNoDialog;
