import { Modal } from "semantic-ui-react";
import { useBoundStore } from "../../stores";

export default function ModalContainer() {
  const { closeModal, modal } = useBoundStore();
  return (
    <Modal open={modal.open} onClose={closeModal} size="mini">
      <Modal.Content>{modal.body}</Modal.Content>
    </Modal>
  );
}
