/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 字体系统 - PingFang SC
      fontFamily: {
        sans: ['PingFang SC', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },

      // 字号系统
      fontSize: {
        'display': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['20px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '1.2', fontWeight: '600' }],
        'h4': ['16px', { lineHeight: '1.2', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption-sm': ['11px', { lineHeight: '1.5', fontWeight: '400' }],
      },

      // 字重系统
      fontWeight: {
        light: '400', // Adjusted from 300 per user request
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      // 行高系统
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        relaxed: '1.75',
      },

      // 颜色系统
      colors: {
        // 品牌主色 - 蓝色系统
        primary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6', // Main Brand Color (Violet)
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },

        // 成功/补偿色 - 绿色系统
        success: {
          50: '#F6F9F8',
          100: '#E8F2ED',
          200: '#CADED5',
          300: '#AAC9BD',
          400: '#8BB4A5',
          500: '#6AB08E', // Muted Sage Green
          600: '#4E876D',
          700: '#3A6350',
          800: '#264034',
          900: '#15241D',
        },

        // 警告色 - 琥珀色系统
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // 危险/错误色 - 红色系统
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        // 中性色 - 灰色系统
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        // 表面色
        surface: {
          base: '#FFFFFF',
          elevated: '#FAFAFA',
          overlay: 'rgba(0, 0, 0, 0.5)',
        },
      },

      // 间距系统 (扩展默认)
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
        '4.5': '18px',
        '5.5': '22px',
        '6.5': '26px',
        '7.5': '30px',
        '8.5': '34px',
        '9.5': '38px',
      },

      // 圆角系统
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
      },

      // 阴影系统
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        // 特殊阴影 - 用于按钮等
        'primary': '0 4px 12px rgba(91, 111, 237, 0.3)',
        'primary-lg': '0 8px 16px rgba(91, 111, 237, 0.4)',
        'success': '0 4px 12px rgba(16, 185, 129, 0.3)',
      },

      // 动画时长
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },

      // 缓动函数
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
