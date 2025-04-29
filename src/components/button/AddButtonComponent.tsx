import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  UncontrolledAlert,
  Spinner,
} from "reactstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),
  destination: Yup.string()
    .min(3, "Destination must be 3 characters at minimum")
    .required("Destination is required"),
});

const AddButtonComponent = (args: any) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggle = () => {
    setMessage("");
    setModal(!modal);
    setLoading(false);
  };
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      destination: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const submitResponse = await axios
        .post("https://jsonplaceholder.typicode.com/posts/", {
          title: values.name,
          body: values.destination,
        })
        .then((response: any) => {
          if (response.status) {
            setLoading(false);
            setMessage("Luggage has been added successfully.");
          }
        })
        .catch((error: any) => {
          console.error("Error in saving posts:", error);
        });
      actions.resetForm();
    },
  });

  return (
    <>
      <Button onClick={toggle}>
        <FontAwesomeIcon icon={faCirclePlus} size="lg" /> Add
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add Luggage Item</ModalHeader>
        <Form>
          <ModalBody style={{ overflow: "hidden" }}>
            {loading ? (
              <Button
                style={{
                  flex: 1,
                  position: "absolute",
                  left: "50%",
                  top: "55%",
                  transform: "translate(-50%, -50%)",
                }}
                color="primary"
                disabled
              >
                <Spinner size="sm">Loading...</Spinner>
                <span> Loading</span>
              </Button>
            ) : (
              ""
            )}
            {message ? (
              <UncontrolledAlert color="info">{message}</UncontrolledAlert>
            ) : (
              ""
            )}
            <FormGroup row>
              <Label for="name" sm={3}>
                Name *
              </Label>
              <Col sm={9}>
                <Input
                  id="name"
                  name="name"
                  className={
                    formik.errors.name && formik.touched.name
                      ? `form-control input-error`
                      : `form-control`
                  }
                  type="text"
                  autoComplete="off"
                  placeholder="Enter item name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="text text-danger">{formik.errors.name}</div>
                ) : (
                  ""
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="destination" sm={3}>
                Destination *
              </Label>
              <Col sm={9}>
                <Input
                  id="destination"
                  name="destination"
                  className={
                    formik.errors.destination && formik.touched.destination
                      ? `form-control input-error`
                      : `form-control`
                  }
                  type="text"
                  autoComplete="off"
                  placeholder="Enter item destination"
                  onChange={formik.handleChange}
                  value={formik.values.destination}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.destination && formik.touched.destination ? (
                  <div className="text text-danger">
                    {formik.errors.destination}
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={formik.handleSubmit}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddButtonComponent;
