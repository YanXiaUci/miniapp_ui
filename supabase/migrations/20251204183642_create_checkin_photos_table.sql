/*
  # 创建打卡照片表

  1. 新表
    - `checkin_photos`
      - `id` (uuid, 主键)
      - `order_id` (text, 关联订单ID)
      - `photo_data` (text, Base64编码的照片数据)
      - `timestamp` (timestamptz, 拍摄时间)
      - `location` (text, 地点名称)
      - `latitude` (numeric, 纬度)
      - `longitude` (numeric, 经度)
      - `weather` (text, 天气信息，可选)
      - `created_at` (timestamptz, 创建时间)

  2. 安全
    - 启用RLS
    - 添加策略允许所有用户读取和插入（demo环境）
*/

CREATE TABLE IF NOT EXISTS checkin_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text NOT NULL,
  photo_data text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  location text NOT NULL,
  latitude numeric,
  longitude numeric,
  weather text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE checkin_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read checkin photos"
  ON checkin_photos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow all to insert checkin photos"
  ON checkin_photos
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all to delete checkin photos"
  ON checkin_photos
  FOR DELETE
  TO public
  USING (true);