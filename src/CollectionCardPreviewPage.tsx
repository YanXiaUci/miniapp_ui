import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { analyzeImageWithAI, processImage } from './services/imageProcessing';
import { generateCollectionCard, availableTemplates, CardTemplate } from './services/cardGenerator';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CollectionCardPreviewPageProps {
  imageData: string;
  location: string;
  orderId: string;
  onBack: () => void;
  onSaved: () => void;
  latitude?: number | null;
  longitude?: number | null;
  weather?: string;
}

type ProcessingStage = 'analyzing' | 'cutout' | 'generating' | 'completed';

export default function CollectionCardPreviewPage({
  imageData,
  location,
  orderId,
  onBack,
  onSaved,
  latitude,
  longitude,
  weather
}: CollectionCardPreviewPageProps) {
  const [stage, setStage] = useState<ProcessingStage>('analyzing');
  const [aiResult, setAiResult] = useState<any>(null);
  const [cutoutImage, setCutoutImage] = useState<string>('');
  const [cardImage, setCardImage] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>('stamp');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    processImageWithAI();
  }, []);

  useEffect(() => {
    if (aiResult && cutoutImage && stage === 'completed') {
      regenerateCard(selectedTemplate);
    }
  }, [selectedTemplate]);

  async function processImageWithAI() {
    try {
      setStage('analyzing');
      const analysis = await analyzeImageWithAI(imageData);
      setAiResult(analysis);

      setStage('cutout');
      const processed = await processImage(imageData);
      setCutoutImage(processed.cutout);

      setStage('generating');
      const date = new Date().toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit'
      });

      const card = await generateCollectionCard(
        {
          cutoutImage: processed.cutout,
          title: analysis.title,
          description: analysis.description,
          location: location,
          date: date,
          subjectType: analysis.subjectType,
          moodTags: analysis.moodTags
        },
        selectedTemplate
      );

      setCardImage(card);
      setStage('completed');
    } catch (error) {
      console.error('处理图片失败:', error);
      alert('处理图片时出错，请重试');
      onBack();
    }
  }

  async function regenerateCard(template: CardTemplate) {
    if (!aiResult || !cutoutImage) return;

    const date = new Date().toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit'
    });

    const card = await generateCollectionCard(
      {
        cutoutImage: cutoutImage,
        title: aiResult.title,
        description: aiResult.description,
        location: location,
        date: date,
        subjectType: aiResult.subjectType,
        moodTags: aiResult.moodTags
      },
      template
    );

    setCardImage(card);
  }

  async function handleSave() {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from('checkin_photos').insert({
        order_id: orderId,
        photo_data: imageData,
        original_image: imageData,
        cutout_image: cutoutImage,
        card_image: cardImage,
        ai_title: aiResult.title,
        ai_description: aiResult.description,
        subject_type: aiResult.subjectType,
        card_template: selectedTemplate,
        processing_status: 'completed',
        mood_tags: aiResult.moodTags,
        location: location,
        latitude: latitude,
        longitude: longitude,
        weather: weather,
        timestamp: new Date().toISOString()
      });

      if (error) throw error;

      onSaved();
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存采集失败，请重试');
    } finally {
      setIsSaving(false);
    }
  }

  const stageInfo = {
    analyzing: { text: '正在识别主体...', icon: Sparkles },
    cutout: { text: '正在提取主体...', icon: ImageIcon },
    generating: { text: '正在生成采集卡片...', icon: Sparkles },
    completed: { text: '生成完成！', icon: Check }
  };

  const currentStage = stageInfo[stage];
  const StageIcon = currentStage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">返回</span>
          </button>
          <div className="flex items-center gap-2 text-gray-700">
            <StageIcon className={`w-5 h-5 ${stage !== 'completed' ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium">{currentStage.text}</span>
          </div>
        </div>

        {stage !== 'completed' && (
          <div className="bg-white rounded-3xl shadow-lg p-12 flex flex-col items-center justify-center min-h-[600px]">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 animate-pulse flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-white animate-spin" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-yellow-400 animate-bounce flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">AI 正在创作你的采集卡片</h2>
            <p className="text-gray-600 text-center max-w-md">
              我们正在分析图片内容，提取精彩瞬间，生成专属于你的精美采集卡片...
            </p>

            <div className="mt-12 space-y-4 w-full max-w-md">
              {(['analyzing', 'cutout', 'generating'] as ProcessingStage[]).map((s, index) => {
                const isPassed = ['analyzing', 'cutout', 'generating'].indexOf(stage) > index;
                const isCurrent = stage === s;

                return (
                  <div key={s} className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isPassed
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-orange-500 text-white animate-pulse'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${isCurrent ? 'text-orange-600' : 'text-gray-700'}`}>
                        {stageInfo[s].text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stage === 'completed' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">采集完成！</h2>
                  <p className="text-gray-600 text-sm">选择你喜欢的卡片样式</p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gray-50 mb-6 shadow-inner">
                <img src={cardImage} alt="采集卡片" className="w-full h-auto" />
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{aiResult?.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{aiResult?.description}</p>
                    <div className="flex gap-2 mt-4">
                      {aiResult?.moodTags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white rounded-full text-sm font-medium text-orange-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-4">选择卡片样式</h3>
                <div className="grid grid-cols-4 gap-3">
                  {availableTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-orange-500 bg-orange-50 shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-3xl mb-2">{template.icon}</div>
                      <div className="text-sm font-medium text-gray-700">{template.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>保存中...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>保存采集</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}