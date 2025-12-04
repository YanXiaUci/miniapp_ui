export interface AIAnalysisResult {
  title: string;
  description: string;
  subjectType: string;
  moodTags: string[];
}

export interface ProcessedImages {
  original: string;
  cutout: string;
}

const subjectLibrary = {
  food: {
    titles: ['美食时刻', '味蕾的旅行', '舌尖上的记忆', '食光机', '美味邂逅'],
    descriptions: [
      '嗯～这个味道，我要记住一辈子！每一口都是幸福的味道。',
      '我是一个热爱美食的灵魂，今天又发现了人间美味！',
      '这一刻，全世界都被这香气包围了，好想时间就停在这一刻。',
      '作为一个资深吃货，我郑重宣布：这绝对是人间值得！'
    ],
    moods: ['幸福', '满足', '惊喜', '享受']
  },
  scenery: {
    titles: ['风景独好', '天地间', '旅途剪影', '这一刻的世界', '远方的诗'],
    descriptions: [
      '站在这里，我突然明白了什么叫做"诗和远方"。',
      '风吹过来的时候，我感觉整个世界都温柔了。',
      '这一刻，我想把这份美好装进口袋带回家。',
      '如果美好有形状，一定就是眼前这个样子吧。'
    ],
    moods: ['惬意', '放松', '自由', '浪漫']
  },
  person: {
    titles: ['人间烟火', '此时此刻', '时光印记', '你好呀', '遇见'],
    descriptions: [
      '这个瞬间，我想永远记住。因为有你在，所以格外美好。',
      '咔嚓一声，把笑容都装进了这一刻。',
      '世界很大，幸好遇见了你。这一刻值得纪念！',
      '在这个特别的地方，留下特别的回忆。'
    ],
    moods: ['温暖', '快乐', '感动', '珍贵']
  },
  animal: {
    titles: ['萌物出没', '小可爱', '动物朋友', '偶遇小家伙', '它说'],
    descriptions: [
      '哇！遇到了一个小可爱！它看我的眼神好像在说"一起玩吧"。',
      '这个小家伙太有趣了，我们对视了好久，它是不是也在好奇我？',
      '突然闯入我镜头的小精灵，谢谢你让我的旅途更加有趣！',
      '我猜它一定有很多故事想告诉我，可惜我听不懂它的语言。'
    ],
    moods: ['可爱', '有趣', '惊喜', '治愈']
  },
  building: {
    titles: ['建筑之美', '城市印记', '这座建筑', '光影交错', '空间诗学'],
    descriptions: [
      '每一栋建筑都有它的故事，而我刚好路过，记录下这一刻。',
      '抬头的瞬间，被这建筑的美震撼到了。设计师一定是个浪漫的人。',
      '在这座城市里，它静静地站在那里，见证着无数人的来来往往。',
      '光影在建筑上跳舞，我按下快门，留住了这诗意的瞬间。'
    ],
    moods: ['震撼', '壮观', '静谧', '艺术']
  },
  object: {
    titles: ['有趣的发现', '小物件', '生活细节', '偶然发现', '物语'],
    descriptions: [
      '平凡的东西，从特别的角度看，也能发现不一样的美。',
      '这个小东西吸引了我的注意，它好像在说"嘿，看看我！"',
      '生活就是由这些小细节组成的，每一个都值得被记录。',
      '停下脚步，发现了这个有意思的小玩意儿。旅行的乐趣就在这里。'
    ],
    moods: ['有趣', '好奇', '发现', '细腻']
  }
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function analyzeImageContent(imageData: string): string {
  const types = Object.keys(subjectLibrary);
  return getRandomItem(types);
}

export async function analyzeImageWithAI(imageData: string): Promise<AIAnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const subjectType = analyzeImageContent(imageData);
  const library = subjectLibrary[subjectType as keyof typeof subjectLibrary];

  return {
    title: getRandomItem(library.titles),
    description: getRandomItem(library.descriptions),
    subjectType,
    moodTags: [getRandomItem(library.moods), getRandomItem(library.moods)]
  };
}

export async function removeBackground(imageData: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageDataObj.data;

      const bgColor = {
        r: data[0],
        g: data[1],
        b: data[2]
      };

      const threshold = 40;
      const edgePadding = 20;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          const isEdge = x < edgePadding || x > canvas.width - edgePadding ||
                        y < edgePadding || y > canvas.height - edgePadding;

          const colorDiff = Math.abs(r - bgColor.r) +
                          Math.abs(g - bgColor.g) +
                          Math.abs(b - bgColor.b);

          if (isEdge || colorDiff < threshold) {
            const distanceToEdge = Math.min(x, y, canvas.width - x, canvas.height - y);
            const fadeRatio = Math.max(0, Math.min(1, distanceToEdge / edgePadding));
            data[idx + 3] = Math.floor(data[idx + 3] * fadeRatio);
          }
        }
      }

      ctx.putImageData(imageDataObj, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = imageData;
  });
}

export async function processImage(imageData: string): Promise<ProcessedImages> {
  const cutout = await removeBackground(imageData);

  return {
    original: imageData,
    cutout
  };
}