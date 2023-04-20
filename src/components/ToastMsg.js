import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastMsg(state, msg){
    console.log("ToastMsg")
    if (state === 'info'){
        toast.info(msg, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    }else if (state === 'warnning'){
        toast.warn(msg, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
}