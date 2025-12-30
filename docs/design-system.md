# Peini Weather 设计系统

本文档定义了 Peini Weather 小程序的完整设计系统,包括颜色、字体、间距、圆角、阴影等设计规范。所有页面和组件都应该从这个设计系统中取值,确保视觉统一性。

---

## 🎨 颜色系统

### 品牌主色 (Primary)

品牌主色使用蓝色系统,代表信任、专业和科技感。

| 色阶 | 颜色值 | Tailwind 类 | 使用场景 |
|------|--------|-------------|----------|
| 50 | `#EEF2FF` | `bg-primary-50` | 浅色背景 |
| 100 | `#E0E7FF` | `bg-primary-100` | 卡片背景 |
| 200 | `#C7D2FE` | `bg-primary-200` | 悬停状态 |
| 300 | `#A5B4FC` | `bg-primary-300` | 边框 |
| 400 | `#818CF8` | `bg-primary-400` | 辅助元素 |
| **500** | **`#5B6FED`** | `bg-primary-500` | **主品牌色** |
| 600 | `#4F46E5` | `bg-primary-600` | 按钮悬停 |
| 700 | `#4338CA` | `bg-primary-700` | 按钮按下 |
| 800 | `#3730A3` | `bg-primary-800` | 深色文字 |
| 900 | `#312E81` | `bg-primary-900` | 最深色 |

**使用示例**:
```tsx
// 主按钮
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  确认
</button>

// 卡片背景
<div className="bg-primary-50 border border-primary-200">
  内容
</div>
```

---

### 成功/补偿色 (Success)

用于表示成功状态、补偿金额等积极信息。

| 色阶 | 颜色值 | Tailwind 类 | 使用场景 |
|------|--------|-------------|----------|
| **500** | **`#10B981`** | `bg-success-500` | **主成功色** |
| 50-100 | 浅绿色 | `bg-success-50/100` | 背景 |
| 600-700 | 深绿色 | `bg-success-600/700` | 强调 |

**使用示例**:
```tsx
// 补偿金额显示
<div className="text-success-600 font-bold">
  +¥2 补偿
</div>

// 成功状态徽章
<span className="bg-success-50 text-success-600 px-3 py-1 rounded-full">
  已补偿
</span>
```

---

### 警告色 (Warning)

用于警告信息、待处理状态等。

| 色阶 | 颜色值 | Tailwind 类 | 使用场景 |
|------|--------|-------------|----------|
| **500** | **`#F59E0B`** | `bg-warning-500` | **主警告色** |
| 50-100 | 浅琥珀色 | `bg-warning-50/100` | 背景 |
| 600-700 | 深琥珀色 | `bg-warning-600/700` | 强调 |

---

### 危险/错误色 (Danger)

用于错误信息、删除操作等。

| 色阶 | 颜色值 | Tailwind 类 | 使用场景 |
|------|--------|-------------|----------|
| **500** | **`#EF4444`** | `bg-danger-500` | **主危险色** |
| 50-100 | 浅红色 | `bg-danger-50/100` | 背景 |
| 600-700 | 深红色 | `bg-danger-600/700` | 强调 |

---

### 中性色 (Neutral)

用于文字、边框、背景等中性元素。

| 色阶 | 颜色值 | Tailwind 类 | 使用场景 |
|------|--------|-------------|----------|
| 50 | `#F9FAFB` | `bg-neutral-50` | 页面背景 |
| 100 | `#F3F4F6` | `bg-neutral-100` | 卡片背景 |
| 200 | `#E5E7EB` | `border-neutral-200` | 边框 |
| 300 | `#D1D5DB` | `border-neutral-300` | 分割线 |
| 400 | `#9CA3AF` | `text-neutral-400` | 占位符 |
| 500 | `#6B7280` | `text-neutral-500` | 辅助文字 |
| 600 | `#4B5563` | `text-neutral-600` | 次要文字 |
| 700 | `#374151` | `text-neutral-700` | 主要文字 |
| 800 | `#1F2937` | `text-neutral-800` | 标题 |
| 900 | `#111827` | `text-neutral-900` | 强调标题 |

---

## ✍️ 字体系统

### 字体家族

**主字体**: PingFang SC (苹方)

```css
font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

### 字号规范

| 名称 | 字号 | 行高 | 字重 | Tailwind 类 | 使用场景 |
|------|------|------|------|-------------|----------|
| Display | 32px | 1.2 | 700 | `text-display` | 大标题/展示文字 |
| H1 | 24px | 1.2 | 700 | `text-h1` | 一级标题 |
| H2 | 20px | 1.2 | 600 | `text-h2` | 二级标题 |
| H3 | 18px | 1.2 | 600 | `text-h3` | 三级标题 |
| H4 | 16px | 1.2 | 600 | `text-h4` | 四级标题 |
| Body Large | 16px | 1.5 | 400 | `text-body-lg` | 大号正文 |
| Body | 14px | 1.5 | 400 | `text-body` | 标准正文 |
| Body Small | 13px | 1.5 | 400 | `text-body-sm` | 小号正文 |
| Caption | 12px | 1.5 | 400 | `text-caption` | 辅助说明 |
| Caption Small | 11px | 1.5 | 400 | `text-caption-sm` | 小号辅助 |

**使用示例**:
```tsx
// 页面标题
<h1 className="text-h1 text-neutral-900">订单详情</h1>

// 卡片标题
<h2 className="text-h2 text-neutral-800">保障进度</h2>

// 正文
<p className="text-body text-neutral-700">保障已生效,正在持续监测天气。</p>

// 辅助文字
<span className="text-caption text-neutral-500">订单号 MHNEW20251229</span>
```

---

### 字重规范

| 名称 | 数值 | Tailwind 类 | 使用场景 |
|------|------|-------------|----------|
| Light | 400 | `font-light` | 轻量文字 (调整为常规粗细) |
| Normal | 400 | `font-normal` | 常规文字 |
| Medium | 500 | `font-medium` | 中等强调 |
| Semibold | 600 | `font-semibold` | 半粗体(标题) |
| Bold | 700 | `font-bold` | 粗体(强调) |

---

### 行高规范

| 名称 | 数值 | Tailwind 类 | 使用场景 |
|------|------|-------------|----------|
| Tight | 1.2 | `leading-tight` | 标题 |
| Normal | 1.5 | `leading-normal` | 正文 |
| Relaxed | 1.75 | `leading-relaxed` | 长文本 |

---

## 📏 间距系统

使用 4px 基准的间距系统,确保视觉节奏一致。

| Tailwind 类 | 数值 | 使用场景 |
|-------------|------|----------|
| `p-0.5` | 2px | 极小间距 |
| `p-1` | 4px | 最小间距 |
| `p-1.5` | 6px | 小间距 |
| `p-2` | 8px | 紧凑间距 |
| `p-2.5` | 10px | 标准小间距 |
| `p-3` | 12px | 标准间距 |
| `p-4` | 16px | 常用间距 |
| `p-5` | 20px | 卡片内边距 |
| `p-6` | 24px | 大间距 |
| `p-8` | 32px | 区块间距 |
| `p-10` | 40px | 大区块间距 |
| `p-12` | 48px | 页面边距 |

**使用建议**:
- **卡片内边距**: `p-4` 或 `p-5`
- **按钮内边距**: `px-4 py-2` 或 `px-6 py-3`
- **页面边距**: `px-4` 或 `px-6`
- **元素间距**: `space-y-3` 或 `space-y-4`

---

## 🔲 圆角系统

| 名称 | 数值 | Tailwind 类 | 使用场景 |
|------|------|-------------|----------|
| None | 0 | `rounded-none` | 无圆角 |
| Small | 4px | `rounded-sm` | 小元素 |
| Default | 8px | `rounded` | 按钮、输入框 |
| Medium | 8px | `rounded-md` | 同 Default |
| Large | 12px | `rounded-lg` | 卡片 |
| XL | 16px | `rounded-xl` | 大卡片 |
| 2XL | 20px | `rounded-2xl` | 模态框 |
| 3XL | 24px | `rounded-3xl` | 特殊容器 |
| Full | 9999px | `rounded-full` | 圆形、胶囊 |

**使用建议**:
- **按钮**: `rounded-full` (胶囊形)
- **卡片**: `rounded-xl` 或 `rounded-2xl`
- **输入框**: `rounded-lg`
- **徽章**: `rounded-full`
- **图片**: `rounded-lg`

---

## 🌑 阴影系统

| 名称 | Tailwind 类 | 使用场景 |
|------|-------------|----------|
| Small | `shadow-sm` | 轻微阴影 |
| Default | `shadow` | 标准阴影 |
| Medium | `shadow-md` | 卡片阴影 |
| Large | `shadow-lg` | 浮动元素 |
| XL | `shadow-xl` | 模态框 |
| 2XL | `shadow-2xl` | 强调阴影 |
| Inner | `shadow-inner` | 内阴影 |
| Primary | `shadow-primary` | 主色阴影(按钮) |
| Primary Large | `shadow-primary-lg` | 大主色阴影 |
| Success | `shadow-success` | 成功色阴影 |

**使用示例**:
```tsx
// 卡片
<div className="bg-white rounded-2xl shadow-md">
  内容
</div>

// 主按钮
<button className="bg-primary-500 shadow-primary hover:shadow-primary-lg">
  确认
</button>

// 浮动卡片
<div className="bg-white rounded-xl shadow-lg">
  重要内容
</div>
```

---

## ⏱️ 动画系统

### 动画时长

| 名称 | 数值 | CSS 变量 | Tailwind 类 | 使用场景 |
|------|------|----------|-------------|----------|
| Fast | 150ms | `--transition-fast` | `duration-150` | 快速反馈 |
| Base | 250ms | `--transition-base` | `duration-250` | 标准动画 |
| Slow | 350ms | `--transition-slow` | `duration-350` | 慢动画 |
| Slower | 500ms | `--transition-slower` | `duration-500` | 复杂动画 |

---

### 缓动函数

| 名称 | 数值 | CSS 变量 | Tailwind 类 | 使用场景 |
|------|------|----------|-------------|----------|
| Smooth | `cubic-bezier(0.4, 0, 0.2, 1)` | `--ease-smooth` | `transition-smooth` | 平滑过渡 |
| Bounce | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | `--ease-bounce` | `transition-bounce` | 弹跳效果 |
| Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `--ease-spring` | `transition-spring` | 弹簧效果 |

**使用示例**:
```tsx
// 按钮悬停
<button className="transition-all duration-250 transition-smooth hover:scale-105">
  点击
</button>

// 模态框进入
<div className="transition-all duration-350 transition-bounce">
  内容
</div>
```

---

## 📋 组件使用示例

### 按钮

```tsx
// 主按钮
<button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold shadow-primary hover:shadow-primary-lg transition-all duration-250">
  确认购买
</button>

// 次要按钮
<button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-6 py-3 rounded-full font-medium transition-all duration-250">
  取消
</button>

// 文字按钮
<button className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-250">
  了解更多
</button>
```

---

### 卡片

```tsx
// 标准卡片
<div className="bg-white rounded-2xl p-5 shadow-md">
  <h3 className="text-h3 text-neutral-900 mb-3">标题</h3>
  <p className="text-body text-neutral-700">内容</p>
</div>

// 带边框卡片
<div className="bg-white rounded-xl p-4 border border-neutral-200">
  内容
</div>

// 彩色背景卡片
<div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
  <p className="text-body text-primary-700">提示信息</p>
</div>
```

---

### 徽章

```tsx
// 状态徽章
<span className="bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full text-caption font-semibold">
  保障中
</span>

<span className="bg-success-50 text-success-600 px-3 py-1.5 rounded-full text-caption font-semibold">
  已补偿
</span>

<span className="bg-warning-50 text-warning-600 px-3 py-1.5 rounded-full text-caption font-semibold">
  待处理
</span>
```

---

### 输入框

```tsx
<input 
  type="text"
  className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-250 text-body"
  placeholder="请输入..."
/>
```

---

## 🎯 设计原则

1. **一致性优先**: 所有组件都应使用设计系统中定义的 tokens
2. **语义化命名**: 使用语义化的颜色名称(primary, success)而非具体颜色(blue, green)
3. **响应式设计**: 确保在不同屏幕尺寸下都有良好体验
4. **可访问性**: 确保足够的颜色对比度和可读性
5. **性能优先**: 使用 Tailwind 的 JIT 模式,只生成使用的样式

---

## 📝 迁移指南

将现有组件迁移到设计系统:

1. **颜色替换**:
   - `bg-blue-500` → `bg-primary-500`
   - `text-green-600` → `text-success-600`
   - `bg-gray-50` → `bg-neutral-50`

2. **字体替换**:
   - `text-2xl font-bold` → `text-h1`
   - `text-lg font-semibold` → `text-h2`
   - `text-sm` → `text-body`
   - `text-xs` → `text-caption`

3. **间距统一**:
   - 使用 4px 的倍数
   - 卡片内边距统一为 `p-4` 或 `p-5`

4. **圆角统一**:
   - 卡片使用 `rounded-xl` 或 `rounded-2xl`
   - 按钮使用 `rounded-full`

---

## 🔗 相关资源

- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [PingFang SC 字体](https://developer.apple.com/fonts/)
- 项目配置: `tailwind.config.js`
- 全局样式: `src/index.css`
