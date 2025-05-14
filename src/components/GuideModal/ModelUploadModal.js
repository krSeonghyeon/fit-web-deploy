import { useState, useRef } from 'react';
import './GuideModal.css';

export default function ModelUploadModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileSelect = async (file) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setPreviewUrl(result.url);
      setUploadedUrl(result.url);
    } catch (err) {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadComplete = () => {
    if (!uploadedUrl) return alert('이미지를 먼저 업로드해주세요');
    onSuccess?.(uploadedUrl);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-slider" style={{ transform: `translateX(-${step * 100}%)` }}>

          {/* ✅ Step 0 */}
          <div className="modal-page">
            <div className="modal-step-indicator">
              <div className={`modal-step-box ${step === 0 ? 'active' : ''}`} />
              <div className={`modal-step-box ${step === 1 ? 'active' : ''}`} />
            </div>

            <div className="example-box">
              <img
                src="https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/4d97c180-d716-413d-a213-59906df1a650.jpg"
                alt="예시 사진"
              />
            </div>

            <div className="modal-guideline-title">모델 사진 가이드라인</div>
            <ul className="modal-guideline-list">
              <li><span className="check-icon">✓</span> 단순한 배경일수록 좋아요</li>
              <li><span className="check-icon">✓</span> 정자세일수록 좋아요</li>
              <li><span className="check-icon">✓</span> 좋은 화질의 이미지를 사용하세요</li>
            </ul>

            <div className="modal-buttons">
              <button onClick={() => setStep(1)}>다음</button>
            </div>
          </div>

          {/* ✅ Step 1 */}
          <div className={`modal-page ${step === 1 ? 'step-1' : ''}`}>
            <div className="modal-step-indicator">
              <div className={`modal-step-box ${step === 0 ? 'active' : ''}`} />
              <div className={`modal-step-box ${step === 1 ? 'active' : ''}`} />
            </div>

            <div
              className="example-box"
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: 'pointer' }}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="업로드 이미지" />
              ) : (
                <div className="upload-placeholder">
                  <p>클릭하여 전신 사진을 등록해주세요</p>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

            <div className="modal-guideline-title">사진 검증</div>
            <ul className="modal-guideline-list">
              <li><span className="check-icon">✓</span> 이미지 품질 확인</li>
              <li><span className="check-icon">✓</span> 사람 유무</li>
              <li><span className="check-icon">✓</span> 정자세 여부</li>
            </ul>

            <div className="modal-buttons">
              <button onClick={handleUploadComplete} disabled={isUploading}>
                {isUploading ? '업로드 중...' : '등록 완료'}
              </button>
              <button onClick={onClose}>취소</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
