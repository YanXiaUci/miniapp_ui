/*
  # 升级打卡照片表为AI采集功能
  
  1. 表结构变更
    - 为 `checkin_photos` 表添加新字段：
      - `original_image` (text) - 原始照片数据（保留未处理的原图）
      - `cutout_image` (text) - 抠图后的主体图片（透明背景）
      - `card_image` (text) - 最终生成的精美卡片图片
      - `ai_title` (text) - AI生成的创意标题
      - `ai_description` (text) - AI生成的趣味描述文案
      - `subject_type` (text) - AI识别的主体类型（food/景点/人物/动物/建筑等）
      - `card_template` (text) - 使用的卡片模板类型（stamp/postcard/polaroid等）
      - `processing_status` (text) - 处理状态（captured/processing/completed/failed）
      - `mood_tags` (text[]) - 情绪标签数组（快乐、浪漫、冒险等）
  
  2. 说明
    - photo_data 字段保留用于向后兼容
    - original_image 将存储原始高质量图片
    - cutout_image 存储AI抠图结果
    - card_image 存储最终的精美卡片
    - 所有新字段都允许NULL，以支持现有数据和逐步处理
    
  3. 索引优化
    - 为 processing_status 添加索引以加快查询
    - 为 subject_type 添加索引以支持分类筛选
    
  4. 安全
    - 添加UPDATE策略允许更新照片信息
*/

-- 添加AI采集相关字段
DO $$
BEGIN
  -- 原始图片
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'original_image'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN original_image text;
  END IF;

  -- 抠图后的图片
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'cutout_image'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN cutout_image text;
  END IF;

  -- 卡片图片
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'card_image'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN card_image text;
  END IF;

  -- AI生成的标题
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'ai_title'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN ai_title text;
  END IF;

  -- AI生成的描述
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'ai_description'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN ai_description text;
  END IF;

  -- 主体类型
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'subject_type'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN subject_type text;
  END IF;

  -- 卡片模板
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'card_template'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN card_template text DEFAULT 'stamp';
  END IF;

  -- 处理状态
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'processing_status'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN processing_status text DEFAULT 'captured';
  END IF;

  -- 情绪标签
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkin_photos' AND column_name = 'mood_tags'
  ) THEN
    ALTER TABLE checkin_photos ADD COLUMN mood_tags text[];
  END IF;
END $$;

-- 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS idx_checkin_photos_processing_status 
  ON checkin_photos(processing_status);

CREATE INDEX IF NOT EXISTS idx_checkin_photos_subject_type 
  ON checkin_photos(subject_type);

CREATE INDEX IF NOT EXISTS idx_checkin_photos_card_template 
  ON checkin_photos(card_template);

-- 添加更新策略
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'checkin_photos' 
    AND policyname = 'Allow all to update checkin photos'
  ) THEN
    CREATE POLICY "Allow all to update checkin photos"
      ON checkin_photos
      FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;