// src/components/GuideModal/index.js
import ModelUploadModal from './ModelUploadModal';
import ClothUploadModal from './ClothUploadModal';

export default function GuideModal({ type, isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  return type === 'model' ? (
    <ModelUploadModal onClose={onClose} onSuccess={onSuccess} />
  ) : (
    <ClothUploadModal onClose={onClose} />
  );
}
