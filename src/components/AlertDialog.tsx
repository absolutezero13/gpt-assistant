import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

interface AlertDialogProps {
  open: boolean;
  setOpen: any;
  title: string;
  content: string;
  onConfirm: any;
}

export function AlertDialog({
  open,
  setOpen,
  title,
  content,
  onConfirm,
}: AlertDialogProps) {
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" color="white">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onConfirm();
            handleClose();
          }}
        >
          {t("yes")}{" "}
        </Button>
        <Button onClick={handleClose} autoFocus>
          {t("no")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
