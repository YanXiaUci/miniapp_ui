import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, MapPin, Clock, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CheckInPhoto {
  id: string;
  order_id: string;
  photo_data: string;
  original_image?: string;
  cutout_image?: string;
  card_image?: string;
  ai_title?: string;
  ai_description?: string;
  subject_type?: string;
  card_template?: string;
  processing_status?: string;
  mood_tags?: string[];
  timestamp: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  weather: string | null;
}

interface Trip {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface CheckInRecordsPageProps {
  onBack: () => void;
  trips: Trip[];
}

export default function CheckInRecordsPage({ onBack, trips }: CheckInRecordsPageProps) {
  const [photos, setPhotos] = useState<CheckInPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<CheckInPhoto | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('checkin_photos')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('加载照片失败:', error);
      } else {
        setPhotos(data || []);
      }
    } catch (error) {
      console.error('加载照片时出错:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('确定要删除这张照片吗？')) {
      return;
    }

    try {
      const { error } = await supabase.from('checkin_photos').delete().eq('id', id);

      if (error) {
        console.error('删除照片失败:', error);
        alert('删除照片失败，请重试');
      } else {
        setPhotos(photos.filter((p) => p.id !== id));
        setSelectedPhoto(null);
        alert('照片已删除');
      }
    } catch (error) {
      console.error('删除照片时出错:', error);
      alert('删除照片时出错，请重试');
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const getOrderLocation = (orderId: string) => {
    const trip = trips.find((t) => t.id === orderId);
    return trip ? trip.location : orderId;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
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

        <div className="sticky top-0 bg-gradient-to-br from-orange-50 to-pink-50 z-20 px-5 pt-16 pb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-1 hover:bg-white/50 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-800" />
              </button>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <h1 className="text-lg font-semibold text-gray-900">我的采集</h1>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span className="text-gray-700 font-medium">{photos.length}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-br from-orange-50/30 to-pink-50/30">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
                <div className="text-gray-500">加载中...</div>
              </div>
            </div>
          ) : photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-pink-200 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-orange-600" />
              </div>
              <p className="text-gray-700 text-base font-medium">还没有采集记录</p>
              <p className="text-gray-500 text-sm mt-2">使用AI采集功能记录精彩瞬间吧</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo) => {
                const displayImage = photo.card_image || photo.photo_data;
                const isAICard = !!photo.card_image;

                return (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    <img src={displayImage} alt="Collection" className="w-full h-full object-cover" />
                    {isAICard && (
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="w-[375px] h-full flex flex-col">
              <div className="flex items-center justify-between px-5 py-4">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => deletePhoto(selectedPhoto.id)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center px-4 overflow-y-auto">
                <div className="w-full">
                  <img
                    src={selectedPhoto.card_image || selectedPhoto.photo_data}
                    alt="Collection detail"
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-t from-black to-transparent mx-4 mb-4 rounded-2xl p-5 space-y-4">
                {selectedPhoto.ai_title && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-white font-bold text-lg">{selectedPhoto.ai_title}</h3>
                    </div>
                    {selectedPhoto.ai_description && (
                      <p className="text-gray-200 text-sm leading-relaxed">{selectedPhoto.ai_description}</p>
                    )}
                  </div>
                )}

                {selectedPhoto.mood_tags && selectedPhoto.mood_tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.mood_tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">{formatDate(selectedPhoto.timestamp)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs truncate">{selectedPhoto.location}</span>
                  </div>
                </div>

                {selectedPhoto.card_template && (
                  <div className="text-center">
                    <span className="text-xs text-gray-400">
                      {selectedPhoto.card_template === 'stamp' && '📮 邮票'}
                      {selectedPhoto.card_template === 'postcard' && '💌 明信片'}
                      {selectedPhoto.card_template === 'polaroid' && '📷 拍立得'}
                      {selectedPhoto.card_template === 'magazine' && '📖 杂志'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
