import { AIAnalysisResult } from './imageProcessing';

export interface CardData {
  cutoutImage: string;
  title: string;
  description: string;
  location: string;
  date: string;
  subjectType: string;
  moodTags: string[];
}

export type CardTemplate = 'stamp' | 'postcard' | 'polaroid' | 'magazine';

interface CardColors {
  bg: string;
  text: string;
  accent: string;
}

const templateColors: Record<string, CardColors[]> = {
  food: [
    { bg: '#FFF4E6', text: '#8B4513', accent: '#FF6B6B' },
    { bg: '#FFE5E5', text: '#C44536', accent: '#FF9A76' },
    { bg: '#FFF8DC', text: '#CD853F', accent: '#FFB347' }
  ],
  scenery: [
    { bg: '#E8F4F8', text: '#2C5F7C', accent: '#87CEEB' },
    { bg: '#F0F8F0', text: '#2F5233', accent: '#90EE90' },
    { bg: '#FFF5EE', text: '#8B7355', accent: '#DEB887' }
  ],
  person: [
    { bg: '#FFF0F5', text: '#8B3A62', accent: '#FF69B4' },
    { bg: '#F5F5DC', text: '#704214', accent: '#DAA520' },
    { bg: '#F0E6FF', text: '#6A4C93', accent: '#B19CD9' }
  ],
  animal: [
    { bg: '#FFF9E6', text: '#8B6914', accent: '#FFD700' },
    { bg: '#F0FFF0', text: '#228B22', accent: '#98FB98' },
    { bg: '#FFE4E1', text: '#CD5C5C', accent: '#FFA07A' }
  ],
  building: [
    { bg: '#F5F5F5', text: '#4A4A4A', accent: '#778899' },
    { bg: '#E6E6FA', text: '#483D8B', accent: '#9370DB' },
    { bg: '#F0F8FF', text: '#4682B4', accent: '#87CEFA' }
  ],
  object: [
    { bg: '#FFFACD', text: '#9B7E46', accent: '#F4A460' },
    { bg: '#FFE4B5', text: '#8B7355', accent: '#DEB887' },
    { bg: '#F5DEB3', text: '#8B6914', accent: '#DAA520' }
  ]
};

function getColorScheme(subjectType: string): CardColors {
  const colors = templateColors[subjectType] || templateColors.object;
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawStampEdge(ctx: CanvasRenderingContext2D, width: number, height: number, edgeSize: number = 20) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  const teethSize = 16;
  const teethCount = Math.floor(width / teethSize);

  ctx.fillStyle = '#F8F8F8';

  for (let i = 0; i < teethCount; i++) {
    const x = i * teethSize + teethSize / 2;
    ctx.beginPath();
    ctx.arc(x, 0, edgeSize / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, height, edgeSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  const teethCountVertical = Math.floor(height / teethSize);
  for (let i = 0; i < teethCountVertical; i++) {
    const y = i * teethSize + teethSize / 2;
    ctx.beginPath();
    ctx.arc(0, y, edgeSize / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width, y, edgeSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

async function generateStampCard(data: CardData): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const cardWidth = 800;
  const cardHeight = 1000;
  canvas.width = cardWidth;
  canvas.height = cardHeight;

  const colors = getColorScheme(data.subjectType);

  drawStampEdge(ctx, cardWidth, cardHeight);

  const innerPadding = 40;
  ctx.fillStyle = colors.bg;
  ctx.fillRect(innerPadding, innerPadding, cardWidth - innerPadding * 2, cardHeight - innerPadding * 2);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;

  const img = new Image();
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = data.cutoutImage;
  });

  const imgSize = Math.min(500, img.width, img.height);
  const imgX = (cardWidth - imgSize) / 2;
  const imgY = 150;

  ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

  ctx.shadowColor = 'transparent';

  ctx.fillStyle = colors.text;
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.title, cardWidth / 2, 110);

  ctx.fillStyle = colors.accent;
  ctx.font = '24px sans-serif';
  ctx.fillText(data.location, cardWidth / 2, 720);

  ctx.fillStyle = colors.text;
  ctx.globalAlpha = 0.5;
  ctx.font = '32px serif';
  ctx.textAlign = 'right';
  ctx.fillText(data.date, cardWidth - 60, cardHeight - 60);

  ctx.globalAlpha = 1;

  if (data.moodTags.length > 0) {
    const tagY = cardHeight - 130;
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    const tagSpacing = 120;
    const startX = cardWidth / 2 - (data.moodTags.length - 1) * tagSpacing / 2;

    data.moodTags.forEach((tag, index) => {
      const x = startX + index * tagSpacing;
      ctx.fillStyle = colors.accent;
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.roundRect(x - 40, tagY - 15, 80, 35, 17);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.text;
      ctx.fillText(tag, x, tagY + 10);
    });
  }

  return canvas.toDataURL('image/png');
}

async function generatePostcardCard(data: CardData): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const cardWidth = 1200;
  const cardHeight = 800;
  canvas.width = cardWidth;
  canvas.height = cardHeight;

  const colors = getColorScheme(data.subjectType);

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, cardWidth - 40, cardHeight - 40);

  ctx.strokeStyle = colors.text;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 2;
  ctx.strokeRect(35, 35, cardWidth - 70, cardHeight - 70);
  ctx.globalAlpha = 1;

  const img = new Image();
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = data.cutoutImage;
  });

  const imgSize = 500;
  const imgX = 100;
  const imgY = (cardHeight - imgSize) / 2;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

  ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

  ctx.shadowColor = 'transparent';

  const textX = imgX + imgSize + 80;
  const textWidth = cardWidth - textX - 100;

  ctx.fillStyle = colors.text;
  ctx.font = 'bold 56px sans-serif';
  ctx.textAlign = 'left';
  wrapText(ctx, data.title, textX, 180, textWidth, 70);

  ctx.fillStyle = colors.accent;
  ctx.font = '28px sans-serif';
  ctx.fillText(data.location, textX, 280);

  ctx.fillStyle = colors.text;
  ctx.font = '24px sans-serif';
  ctx.globalAlpha = 0.8;
  wrapText(ctx, data.description, textX, 360, textWidth, 40);

  ctx.globalAlpha = 0.6;
  ctx.font = 'italic 22px serif';
  ctx.textAlign = 'right';
  ctx.fillText(data.date, cardWidth - 80, cardHeight - 80);

  ctx.globalAlpha = 1;

  return canvas.toDataURL('image/png');
}

async function generatePolaroidCard(data: CardData): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const cardWidth = 800;
  const cardHeight = 950;
  canvas.width = cardWidth;
  canvas.height = cardHeight;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;

  ctx.fillStyle = '#FAFAFA';
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  ctx.shadowColor = 'transparent';

  const img = new Image();
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = data.cutoutImage;
  });

  const padding = 40;
  const imgHeight = 600;
  const imgY = padding;

  ctx.fillStyle = '#F8F8F8';
  ctx.fillRect(padding, imgY, cardWidth - padding * 2, imgHeight);

  const imgSize = Math.min(imgHeight - 40, img.width, img.height);
  const imgX = (cardWidth - imgSize) / 2;

  ctx.drawImage(img, imgX, imgY + 20, imgSize, imgSize);

  const bottomAreaY = imgY + imgHeight + 40;

  const colors = getColorScheme(data.subjectType);
  ctx.fillStyle = colors.text;
  ctx.font = '36px "Brush Script MT", cursive, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.title, cardWidth / 2, bottomAreaY);

  ctx.font = '22px sans-serif';
  ctx.globalAlpha = 0.7;
  ctx.fillText(data.location + ' • ' + data.date, cardWidth / 2, bottomAreaY + 50);

  ctx.globalAlpha = 1;

  return canvas.toDataURL('image/png');
}

async function generateMagazineCard(data: CardData): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const cardWidth = 900;
  const cardHeight = 1200;
  canvas.width = cardWidth;
  canvas.height = cardHeight;

  const colors = getColorScheme(data.subjectType);

  const gradient = ctx.createLinearGradient(0, 0, 0, cardHeight);
  gradient.addColorStop(0, colors.bg);
  gradient.addColorStop(1, adjustBrightness(colors.bg, -10));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  ctx.fillStyle = colors.accent;
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, cardWidth, 200);
  ctx.globalAlpha = 1;

  ctx.fillStyle = colors.text;
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.title.toUpperCase(), cardWidth / 2, 120);

  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(100, 160);
  ctx.lineTo(cardWidth - 100, 160);
  ctx.stroke();

  const img = new Image();
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = data.cutoutImage;
  });

  const imgSize = 600;
  const imgX = (cardWidth - imgSize) / 2;
  const imgY = 240;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 20;

  ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

  ctx.shadowColor = 'transparent';

  const textY = imgY + imgSize + 80;

  ctx.fillStyle = colors.text;
  ctx.font = 'italic 26px serif';
  ctx.textAlign = 'center';
  ctx.globalAlpha = 0.9;
  wrapText(ctx, data.description, cardWidth / 2, textY, cardWidth - 120, 45);

  ctx.globalAlpha = 1;
  ctx.fillStyle = colors.accent;
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(data.location, cardWidth / 2, cardHeight - 100);

  ctx.fillStyle = colors.text;
  ctx.globalAlpha = 0.6;
  ctx.font = '20px sans-serif';
  ctx.fillText(data.date, cardWidth / 2, cardHeight - 60);

  ctx.globalAlpha = 1;

  return canvas.toDataURL('image/png');
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split('');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export async function generateCollectionCard(
  data: CardData,
  template: CardTemplate = 'stamp'
): Promise<string> {
  switch (template) {
    case 'stamp':
      return generateStampCard(data);
    case 'postcard':
      return generatePostcardCard(data);
    case 'polaroid':
      return generatePolaroidCard(data);
    case 'magazine':
      return generateMagazineCard(data);
    default:
      return generateStampCard(data);
  }
}

export const availableTemplates: { id: CardTemplate; name: string; icon: string }[] = [
  { id: 'stamp', name: '邮票', icon: '📮' },
  { id: 'postcard', name: '明信片', icon: '💌' },
  { id: 'polaroid', name: '拍立得', icon: '📷' },
  { id: 'magazine', name: '杂志', icon: '📖' }
];