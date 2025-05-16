import { useState, useRef } from 'react';
import './GuideModal.css';

export default function ClothUploadModal({ onClose, onSuccess, clothType, guideAlreadyShown }) {
  const [step, setStep] = useState(guideAlreadyShown ? 1 : 0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const exampleImageMap = {
    top: 'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/60b5b477-fb92-4716-8d9b-2933d2a8e0bb.png',
    bottom: 'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/a5724a9f-5e9a-481d-8967-9406dcc36787.jpg',
    onePiece: 'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/21452436-7aa7-4037-9ae5-ccc85c31ab78.png',
    outer: 'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/ce24422f-2e83-4393-bd5f-efd2300f883f.png',
    inner: 'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/427ca040-f318-4a9b-9258-7a7820b32f3f.png',
    longOuter: 'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-05-06/3668fd28-9b01-4de5-9415-933966f6bc00.png',
    innerwear: 'https://2dfittingroom.s3.ap-northeast-2.amazonaws.com/2025-04-01/427ca040-f318-4a9b-9258-7a7820b32f3f.png',
  };

  const exampleUrl = exampleImageMap[clothType];

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
    onSuccess?.(clothType, uploadedUrl);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-slider" style={{ transform: `translateX(-${step * 100}%)` }}>
          {/* ✅ Step 0 - 가이드 */}
          <div className="modal-page">
            {!guideAlreadyShown && (
              <div className="modal-step-indicator">
                <div className={`modal-step-box ${step === 0 ? 'active' : ''}`} />
                <div className={`modal-step-box ${step === 1 ? 'active' : ''}`} />
              </div>
            )}
            <div className="example-box">
              {exampleUrl ? (
                <img src={exampleUrl} alt="예시 사진" />
              ) : (
                <div className="upload-placeholder">
                  <p>예시 이미지를 불러올 수 없습니다.</p>
                </div>
              )}
            </div>
            <div className="modal-guideline-title">의상 사진 가이드라인</div>
            <ul className="modal-guideline-list">
              <li><span className="check-icon">✓</span> 사진에는 의상만 있어야 해요</li>
              <li><span className="check-icon">✓</span> 입고있는 사진은 사용할 수 없어요</li>
              <li><span className="check-icon">✓</span> 팔이 접힌 의상은 사용할 수 없어요</li>
            </ul>
            <div className="modal-buttons">
              <button onClick={() => setStep(1)}>다음</button>
            </div>
          </div>

          {/* ✅ Step 1 - 업로드 */}
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
                  <p>클릭하여 의상 사진을 등록해주세요</p>
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
              <li><span className="check-icon">✓</span> 단일 의상 여부</li>
              <li><span className="check-icon">✓</span> 접힌 의상 여부</li>
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
