import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
    autoClose: 5000
});

export default class Toast {
    static position(name) {
        return toast.POSITION[name];
    }

    static info(message, settings = {}) {
        toast.info(message, settings);
    }

    static success(message, settings = {}) {
        toast.success(message, settings);
    }

    static warning(message, settings = {}) {
        toast.warn(message, settings);
    }

    static error(message, settings = {}) {
        toast.error(message, settings);
    }
}