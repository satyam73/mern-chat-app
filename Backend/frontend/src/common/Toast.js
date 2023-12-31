import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext({})

export default function ToastProvider({ children }) {
  const [toastDetails, setToastDetails] = useState({
    isVisible: false,
    text: '',
    type: 'info',
    hideDuration: 3000,
    position: { vertical: "top", horizontal: "right" }
  });

  const handleClose = () => {
    setToastDetails({ ...toastDetails, isVisible: false, text: '' });
  }

  return (
    <ToastContext.Provider value={{ toast: toastDetails, showToast: setToastDetails }}>
      <Snackbar
        open={toastDetails.isVisible}
        autoHideDuration={toastDetails.hideDuration}
        anchorOrigin={toastDetails.position}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toastDetails.type}
          sx={{ width: "100%" }}
        >
          {toastDetails.text}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider >
  );
}

export const useToast = () => {
  const { toast, showToast } = useContext(ToastContext);

  return { toast, showToast };
};