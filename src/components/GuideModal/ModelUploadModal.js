import { useState, useRef } from 'react';
import './GuideModal.css';

export default function ModelUploadModal({ onClose, onSuccess, guideAlreadyShown }) {
  const [step, setStep] = useState(guideAlreadyShown ? 1 : 0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = async (file) => {
    if (!file) return;
    setPreviewUrl(null);
    setUploadedUrl(null);
    setValidationResult(null);
    setIsUploading(true);
    setIsChecking(false);

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

      setIsChecking(true);
      const personRes = await fetch(`${process.env.REACT_APP_API_URL}/person`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: result.url }),
      });
      const personResult = await personRes.json();
      setValidationResult(personResult);
    } catch (err) {
      alert('이미지 업로드 또는 검증에 실패했습니다.');
    } finally {
      setIsUploading(false);
      setIsChecking(false);
    }
  };

  const handleUploadComplete = () => {
    if (!uploadedUrl) return alert('이미지를 먼저 업로드해주세요');
    onSuccess?.(uploadedUrl);
  };

  const renderCheckItem = (label, key) => {
    if (!validationResult && !isChecking) {
      return (
        <li key={key}>
          <span className="check-icon default">✓</span>
          {label}
        </li>
      );
    }
    if (isChecking && !validationResult) {
      return (
        <li key={key}>
          <span className="check-icon spinner" />
          {label}
        </li>
      );
    }

    const value = validationResult?.[key];
    const icon = value ? '✓' : '✕';
    const className = value ? 'check-icon success' : 'check-icon fail';

    return (
      <li key={key}>
        <span className={className}>{icon}</span>
        {label}
      </li>
    );
  };

  const hasValidationFailed =
    validationResult && Object.values(validationResult).some((v) => v === false);

  const uploadButtonText = isUploading
    ? '업로드 중...'
    : hasValidationFailed
      ? '그냥 진행하기'
      : '등록 완료';

  const uploadButtonClass = uploadButtonText === '등록 완료' ? 'modal-button-primary' : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-slider" style={{ transform: `translateX(-${step * 100}%)` }}>
          <div className="modal-page">
            {!guideAlreadyShown && (
              <div className="modal-step-indicator">
                <div className={`modal-step-box ${step === 0 ? 'active' : ''}`} />
                <div className={`modal-step-box ${step === 1 ? 'active' : ''}`} />
              </div>
            )}
            <div className="example-box">
              <img
                src="https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/4d97c180-d716-413d-a213-59906df1a650.jpg"
                alt="예시 사진"
              />
            </div>
            <div className="modal-guideline-title">모델 사진 가이드라인</div>
            <ul className="modal-guideline-list">
              <li><span className="check-icon default">✓</span> 단순한 배경일수록 좋아요</li>
              <li><span className="check-icon default">✓</span> 자세가 정자세일수록 좋아요</li>
              <li><span className="check-icon default">✓</span> 좋은 화질의 이미지를 사용하세요</li>
            </ul>
            <div className="modal-buttons">
              <button onClick={() => setStep(1)}>다음</button>
            </div>
          </div>

          <div className={`modal-page ${step === 1 ? 'step-1' : ''}`}>
            {!guideAlreadyShown && (
              <div className="modal-step-indicator">
                <div className={`modal-step-box ${step === 0 ? 'active' : ''}`} />
                <div className={`modal-step-box ${step === 1 ? 'active' : ''}`} />
              </div>
            )}
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
            <div className="modal-guideline-title">최고의 가상 피팅을 위한 사진 검증</div>
            <ul className="modal-guideline-list1">
              {renderCheckItem('사진품질 확인', 'quality')}
              {renderCheckItem('사람유무 판별', 'detected')}
              {renderCheckItem('단일인물 여부', 'single')}
            </ul>

            <div className="modal-buttons">
              <button
                onClick={handleUploadComplete}
                disabled={isUploading || isChecking || !uploadedUrl}
                className={uploadButtonClass}
              >
                {uploadButtonText}
              </button>
              <button onClick={onClose}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}