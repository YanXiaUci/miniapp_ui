import { ArrowLeft, MapPin, Clock, Ticket } from 'lucide-react';
import { amusementParks, AmusementPark } from './amusementParkData';

interface AmusementParkListPageProps {
  onBack: () => void;
  onSelectPark: (park: AmusementPark) => void;
}

function AmusementParkListPage({ onBack, onSelectPark }: AmusementParkListPageProps) {
  const getCardGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-purple-50 to-purple-100/50',
      'bg-gradient-to-br from-pink-50 to-pink-100/50',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 20h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4V10h-4v10zm6-18v18h4V2h-4z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
            </svg>
          </div>
        </div>

        <div className="sticky top-0 bg-white z-20 px-6 pt-16 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">选择演示游乐园</h1>
          </div>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 mx-6 mb-4 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="text-sm font-semibold text-orange-900 mb-1">演示模式</p>
              <p className="text-xs text-orange-800 leading-relaxed">
                以下是模拟的第三方游乐园小程序。选择任一游乐园进入对应页面，体验天气保障集成流程。
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 px-6 pb-8">
          <div className="space-y-4">
            {amusementParks.map((park, index) => (
              <button
                key={park.id}
                onClick={() => onSelectPark(park)}
                className={`w-full rounded-2xl p-5 shadow-sm text-left hover:shadow-md transition-all active:scale-[0.98] ${getCardGradient(index)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{park.name}</h3>
                    <p className="text-xs text-gray-600">{park.description}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{park.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>开放时间：{park.openingHours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Ticket className="w-4 h-4 text-gray-500" />
                    <span>成人畅玩票</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200/60 flex items-center justify-between">
                  <span className="text-sm text-gray-600">门票价格</span>
                  <span className="text-xl font-bold text-gray-900">¥{park.ticketPrice}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmusementParkListPage;
