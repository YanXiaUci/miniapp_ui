import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, RotateCcw, Check, Image as ImageIcon, MapPin, Clock } from 'lucide-react';
import { supabase } from './lib/supabase';

interface Trip {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface CameraPageProps {
  onBack: () => void;
  preselectedOrderId?: string;
  trips: Trip[];
  onPhotoSaved?: () => void;
}

export default function CameraPage({ onBack, preselectedOrderId, trips, onPhotoSaved }: CameraPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('获取位置中...');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weather, setWeather] = useState<string>('晴天');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(preselectedOrderId || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showOrderSelect, setShowOrderSelect] = useState(false);
  const [cameraError, setCameraError] = useState<string>('');

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [capturedImage]);

  const updateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}`);
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          setLocation(`${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`);
        },
        (error) => {
          console.error('获取位置失败:', error);
          setLocation('位置获取失败');
        }
      );
    } else {
      setLocation('不支持定位');
    }
  };

  const startCamera = async () => {
    try {
      setCameraError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('无法访问相机:', error);
      setCameraError('无法访问相机，请确保已授予相机权限');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const watermarkHeight = 120;
        const padding = 20;

        context.fillStyle = 'rgba(0, 0, 0, 0.6)';
        context.fillRect(0, canvas.height - watermarkHeight, canvas.width, watermarkHeight);

        context.fillStyle = '#ffffff';
        context.font = 'bold 32px sans-serif';
        context.fillText(`📍 ${location}`, padding, canvas.height - watermarkHeight + 40);

        context.font = '28px sans-serif';
        context.fillText(`🕐 ${currentTime}`, padding, canvas.height - watermarkHeight + 75);
        context.fillText(`☀️ ${weather}`, padding, canvas.height - watermarkHeight + 105);

        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const savePhoto = async () => {
    if (!capturedImage) return;

    if (!selectedOrderId) {
      alert('请选择关联订单');
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase.from('checkin_photos').insert({
        order_id: selectedOrderId,
        photo_data: capturedImage,
        timestamp: new Date().toISOString(),
        location: location,
        latitude: latitude,
        longitude: longitude,
        weather: weather,
      });

      if (error) {
        console.error('保存照片失败:', error);
        alert('保存照片失败，请重试');
      } else {
        alert('打卡成功！');
        if (onPhotoSaved) {
          onPhotoSaved();
        }
        onBack();
      }
    } catch (error) {
      console.error('保存照片时出错:', error);
      alert('保存照片时出错，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const activeTrips = trips.filter((trip) => trip.status === '保障中' || trip.status === '已支付');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-900 min-h-screen flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-10">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 20h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4V10h-4v10zm6-18v18h4V2h-4z" />
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
          </div>
        </div>

        <div className="sticky top-0 bg-gray-900 z-20 px-5 pt-16 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-1 hover:bg-gray-800 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-lg font-semibold text-white">水印相机</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {cameraError ? (
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-white text-sm mb-4">{cameraError}</p>
                <button
                  onClick={startCamera}
                  className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium"
                >
                  重试
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative bg-black flex-1 flex items-center justify-center">
                {capturedImage ? (
                  <img src={capturedImage} alt="Captured" className="max-w-full max-h-full object-contain" />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{currentTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <span>☀️</span>
                        <span>{weather}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {capturedImage && (
                <div className="bg-gray-900 px-5 py-4">
                  <div className="mb-3">
                    <label className="text-white text-sm mb-2 block">关联订单</label>
                    <button
                      onClick={() => setShowOrderSelect(!showOrderSelect)}
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl text-left flex items-center justify-between"
                    >
                      <span>
                        {selectedOrderId
                          ? trips.find((t) => t.id === selectedOrderId)?.location || '请选择订单'
                          : '请选择订单'}
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform ${showOrderSelect ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {showOrderSelect && (
                      <div className="mt-2 bg-gray-800 rounded-xl overflow-hidden">
                        {activeTrips.length > 0 ? (
                          activeTrips.map((trip) => (
                            <button
                              key={trip.id}
                              onClick={() => {
                                setSelectedOrderId(trip.id);
                                setShowOrderSelect(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                            >
                              <div className="text-white text-sm font-medium">{trip.location}</div>
                              <div className="text-gray-400 text-xs mt-1">
                                {trip.startDate} - {trip.endDate} · {trip.id}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-gray-400 text-sm">
                            暂无保障中的订单
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-gray-900 px-5 py-6">
                {capturedImage ? (
                  <div className="flex gap-3">
                    <button
                      onClick={retakePhoto}
                      className="flex-1 py-4 rounded-xl bg-gray-800 text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                      重拍
                    </button>
                    <button
                      onClick={savePhoto}
                      disabled={isSaving}
                      className="flex-1 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      style={{ backgroundColor: '#5B6FED' }}
                    >
                      <Check className="w-5 h-5" />
                      {isSaving ? '保存中...' : '保存'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={capturePhoto}
                    className="w-20 h-20 rounded-full bg-white border-4 border-gray-700 mx-auto block hover:scale-105 transition-transform active:scale-95"
                  >
                    <div className="w-full h-full rounded-full bg-white"></div>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
