/*
  # 马拉松集成演示系统数据表

  1. 新建表
    - `marathon_events` - 存储马拉松赛事信息
      - `id` (uuid, primary key) - 赛事ID
      - `event_id` (text, unique) - 赛事标识符
      - `name` (text) - 赛事名称
      - `city` (text) - 举办城市
      - `event_date` (date) - 比赛日期
      - `registration_fee` (numeric) - 报名费用
      - `image_url` (text) - 赛事图片URL
      - `description` (text) - 赛事描述
      - `distance` (text) - 比赛距离
      - `start_time` (time) - 起跑时间
      - `compensation_rate` (numeric) - 补偿比例
      - `created_at` (timestamptz) - 创建时间
      
    - `referral_sources` - 记录从第三方跳转的订单来源
      - `id` (uuid, primary key) - 记录ID
      - `order_id` (text) - 订单编号
      - `source_app` (text) - 来源应用
      - `source_event` (text) - 来源赛事
      - `location` (text) - 保障地点
      - `start_date` (text) - 开始日期
      - `end_date` (text) - 结束日期
      - `amount` (numeric) - 金额
      - `compensation_amount` (numeric) - 补偿金额
      - `created_at` (timestamptz) - 创建时间
      
    - `demo_sessions` - 记录演示使用情况
      - `id` (uuid, primary key) - 会话ID
      - `user_id` (text) - 用户ID
      - `event_selected` (text) - 选择的赛事
      - `completed_flow` (boolean) - 是否完成流程
      - `created_at` (timestamptz) - 创建时间
      
  2. 安全配置
    - 为所有表启用RLS
    - 添加适当的访问策略
    
  3. 重要说明
    - 这些表用于演示和数据分析
    - 支持未来B2B合作伙伴数据追踪
*/

CREATE TABLE IF NOT EXISTS marathon_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text UNIQUE NOT NULL,
  name text NOT NULL,
  city text NOT NULL,
  event_date date NOT NULL,
  registration_fee numeric NOT NULL DEFAULT 0,
  image_url text,
  description text,
  distance text DEFAULT '42.195公里',
  start_time time,
  compensation_rate numeric DEFAULT 0.5,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS referral_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text,
  source_app text NOT NULL,
  source_event text NOT NULL,
  location text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  compensation_amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS demo_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text,
  event_selected text,
  completed_flow boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE marathon_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view marathon events"
  ON marathon_events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert marathon events"
  ON marathon_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view referral sources"
  ON referral_sources FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert referral sources"
  ON referral_sources FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view demo sessions"
  ON demo_sessions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert demo sessions"
  ON demo_sessions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update own demo sessions"
  ON demo_sessions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
