import { Modal } from "flowbite-react";
import SignUp from "./Register";

type SignupModalProps = {
    open: boolean;
    onClose: () => void;
};

function SignupModal({ open, onClose }: SignupModalProps) {
    return (
        <Modal show={open} onClose={onClose} size="7xl" popup
    >
            <Modal.Header />
            <Modal.Body>
                <SignUp onClose={onClose} />
            </Modal.Body>
        </Modal>
    );
}

export default SignupModal; 