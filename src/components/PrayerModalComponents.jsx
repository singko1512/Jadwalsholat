import { Modal, Button } from 'flowbite-react';

export default function PrayerModal({ open, onClose, name, time }) {
    return (
        <Modal show={open} onClose={onClose} size="md">
            <Modal.Header>
                Waktu Sholat {name}
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-2 text-center">
                    <p className="text-lg font-semibold text-gray-800">
                        Sudah masuk waktu {name}.
                    </p>
                    <p className="text-sm text-gray-500">
                        Jam: <span className="font-bold">{time}</span>
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-center">
                <Button color="success" onClick={onClose}>
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
}