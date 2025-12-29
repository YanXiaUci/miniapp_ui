import { ArrowLeft, MoreVertical, Clock, CloudRain, Sun, Shield } from 'lucide-react';
import { ScenicReferralData } from './scenicData';
import Tooltip from './Tooltip';

interface ScenicOrderDetailPageProps {
  referralData: ScenicReferralData;
  onBack: () => void;
}

function ScenicOrderDetailPage({ referralData, onBack }: ScenicOrderDetailPageProps) {
  const orderId = `MHJQ${referralData.source === 'guizhou-houertk' ? 'GZ' : 'LY'}${new Date().getTime().toString().slice(-8)}`;
  const isHouErTianKeng = referralData.scenicName.includes('猴耳天坑');
  const timeRange = isHouErTianKeng ? '09:00-18:00' : '08:00-18:00';
  const minDuration = isHouErTianKeng ? '2小时' : '2小时';
  const status = '已支付';
  const statusColor = 'bg-cyan-100 text-cyan-600';

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

        <div className="sticky top-0 bg-white z-20 px-5 pt-16 pb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-800" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">订单详情</h1>
            </div>
            <div className="relative">
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 pb-8">
          <div className="bg-white rounded-2xl p-5 mt-3 shadow-sm">
            <div className="mb-3">
              <div className="text-lg font-bold text-gray-900 mb-1">{referralData.scenicName}</div>
              <div className="text-xs text-gray-500 font-medium">订单号 {orderId}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-700 font-medium mb-0.5">{referralData.visitDate}</div>
                <div className="text-xs text-gray-500">共{(() => {
                  const dates = calculateDays(referralData.visitDate);
                  return dates.length > 0 ? dates.length : 1;
                })()}天</div>
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${statusColor}`}>{status}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">保障进度</h2>
            </div>
            <div className="space-y-3">
              {(() => {
                const dates = calculateDays(referralData.visitDate);

                // If only 1 day or empty, fall back to simple display (or treat as single day list)
                if (dates.length <= 1) {
                  return (
                    <div className="border-l-2 pl-4" style={{ borderColor: '#5B6FED' }}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" style={{ color: '#5B6FED' }} />
                          <span className="text-sm font-medium text-gray-900">{referralData.visitDate}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          您的保障将在 <span className="font-semibold" style={{ color: '#5B6FED' }}>{referralData.visitDate}</span> 开始，祝您游玩愉快！
                        </p>
                      </div>
                    </div>
                  );
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const pastOrTodayDates = dates.filter(d => d.getTime() <= today.getTime());
                const futureDates = dates.filter(d => d.getTime() > today.getTime());

                return (
                  <>
                    {pastOrTodayDates.map((date) => {
                      const dateStr = formatDate(date);
                      const isToday = date.getTime() === today.getTime();

                      return (
                        <div key={dateStr} className="border-l-2 pl-4" style={{ borderColor: '#E5E7EB' }}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {/* Use CloudRain for example past day to match screenshot vibes if we wanted, but Sun is safe */}
                              <Sun className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">{dateStr}</span>
                            </div>
                            <span className="text-xs text-gray-500">无需补偿</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600">
                              {isToday ? '保障生效中' : '未触发'}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {futureDates.length > 0 && (
                      <div className="border-l-2 pl-4" style={{ borderColor: '#5B6FED' }}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" style={{ color: '#5B6FED' }} />
                            <span className="text-sm font-medium text-gray-900">
                              {futureDates.length === 1
                                ? formatDate(futureDates[0])
                                : `${formatDate(futureDates[0])}-${formatDate(futureDates[futureDates.length - 1])}`
                              }
                            </span>
                          </div>
                          <span className="text-xs font-medium text-blue-600">待开始</span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            保障将于当日08:00生效
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-3">费用明细</h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">天气保障费用（{(() => {
                    const dates = calculateDays(referralData.visitDate);
                    return dates.length > 0 ? dates.length : 1;
                  })()}天）</span>
                  <span className="text-gray-900">¥{referralData.weatherInsuranceFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2.5 mt-2.5"></div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: '#5B6FED' }} />
                    <span className="text-sm font-semibold text-gray-900">
                      总补偿金额
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">
                      待触发
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-500">
                    ¥0
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-3">补偿规则</h2>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {timeRange} 下雨满 <span className="font-semibold" style={{ color: '#5B6FED' }}>{minDuration}</span>，可获得 <span className="font-semibold" style={{ color: '#5B6FED' }}>{referralData.compensationAmount} 元</span> 补偿
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    降雨强度达到{' '}
                    <Tooltip content="地面有小水坑的程度。">
                      <span className="font-semibold border-b border-dashed border-gray-400" style={{ color: '#5B6FED' }}>1.5 mm/h</span>
                    </Tooltip>
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    补偿通知将通过短信发送
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-3">景区信息</h2>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">景区名称</span>
                <span className="text-gray-900 font-medium">{referralData.scenicName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">地点</span>
                <span className="text-gray-900 font-medium text-right max-w-[200px]">{referralData.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">游玩日期</span>
                <span className="text-gray-900 font-medium">{referralData.visitDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">门票价格</span>
                <span className="text-gray-900 font-medium">¥{referralData.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions placed outside component to keep it clean
function calculateDays(dateRangeVal: string): Date[] {
  // Handle simple range format: "12月28日-01月03日" or "12月28日"

  const currentYear = new Date().getFullYear();
  const parts = dateRangeVal.split('-');

  if (parts.length === 1) {
    const d = parseDateStr(parts[0], currentYear);
    return d ? [d] : [];
  }

  if (parts.length === 2 && parts[0].includes('月') && parts[1].includes('月')) {
    const start = parseDateStr(parts[0], currentYear);
    // For end date, if month is smaller than start month, assume next year
    let endYear = currentYear;
    const startMatch = parts[0].match(/(\d+)月/);
    const endMatch = parts[1].match(/(\d+)月/);
    const startMonth = parseInt(startMatch ? startMatch[1] : '0');
    const endMonth = parseInt(endMatch ? endMatch[1] : '0');

    if (endMonth < startMonth) {
      endYear += 1;
    }

    const end = parseDateStr(parts[1], endYear);

    if (start && end) {
      const days: Date[] = [];
      const current = new Date(start);
      // Safety break
      let count = 0;
      while (current <= end && count < 365) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
        count++;
      }
      return days;
    }
  }

  // Fallback for unexpected format: return empty, effectively just 1 day logic will trigger if length <= 1
  return [];
}

function parseDateStr(str: string, year: number): Date | null {
  const match = str.match(/(\d+)月(\d+)日/);
  if (!match) return null;
  const month = parseInt(match[1]) - 1;
  const day = parseInt(match[2]);
  return new Date(year, month, day);
}

function formatDate(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${m.toString().padStart(2, '0')}月${d.toString().padStart(2, '0')}日`;
}

export default ScenicOrderDetailPage;
