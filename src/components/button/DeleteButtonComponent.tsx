import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DeleteButtonComponent = (params : any) => {
    return <FontAwesomeIcon icon={faTrash} style={{color: "red"}}/>;
};

export default DeleteButtonComponent;