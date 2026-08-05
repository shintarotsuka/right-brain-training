// 日本語の意味のある文章セット
const japaneseTexts = [
  '毎日の生活の中で新しい発見をしよう。',
  '美しい景色は心を癒してくれます。',
  '音楽は人生に喜びをもたらします。',
  '読書は知識の宝庫です。',
  '運動は健康を保つために大切です。',
  '友人との時間は貴重です。',
  '家族との絆は何より大事。',
  '春の桜は とても美しい季節。',
  '夏の空は深く澄んでいます。',
  '秋の紅葉は見応えがあります。',
  '冬の雪は静寂をもたらします。',
  'コーヒーの香りは心を落ち着かせます。',
  '海の波音は癒しになります。',
  '森の中は空気が清々しいです。',
  '雨の日の散歩も風情があります。',
  '星空を眺めるのは素晴らしい。',
  'にじは雨の後に現れます。',
  '蝶は花から花へ飛びます。',
  '鳥のさえずりは朝の合唱です。',
  'そよ風は心地よいです。',
  '木々は四季を教えてくれます。',
  '花は美しく咲き誇ります。',
  '雲は空を飾ります。',
  '月は夜の王様です。',
  '太陽は生命を与えます。',
  '水は生命の源です。',
  '火は温かさをもたらします。',
  '土は植物を育みます。',
  '風は自由の象徴です。',
  '光と影は調和します。',
];

// テキストから指定された行数と文字数の文章を作成
function generateText(rows, charsPerRow, symmetryType) {
  let text = '';
  
  // ランダムに文章を選びながら連結
  for (let i = 0; i < rows; i++) {
    let line = '';
    while (line.length < charsPerRow) {
      const randomText = japaneseTexts[Math.floor(Math.random() * japaneseTexts.length)];
      line += randomText;
    }
    text += line.substring(0, charsPerRow) + '\n';
  }
  
  return text.trim();
}

// 上下対称のテキストを作成
function makeVerticalSymmetry(text) {
  const lines = text.split('\n');
  const reversed = lines.map(line => {
    return line.split('').reverse().join('');
  }).reverse();
  
  return [...lines, '', ...reversed].join('\n');
}

// 左右対称（鏡文字）のテキストを作成
function makeHorizontalSymmetry(text) {
  const lines = text.split('\n');
  const mirrored = lines.map(line => {
    return line.split('').reverse().join('');
  });
  
  return mirrored.join('\n');
}

// ごちゃまぜのテキストを作成
function makeMixed(text) {
  const lines = text.split('\n');
  return lines.map(line => {
    const chars = line.split('');
    // ランダムに反転を適用
    return chars.map(char => {
      return Math.random() > 0.5 ? reverseChar(char) : char;
    }).join('');
  }).join('\n');
}

// 1文字を反転させる（簡易版）
function reverseChar(char) {
  // 日本語はそのまま、英数字のみ反転
  if (char.match(/[a-zA-Z0-9]/)) {
    return char.split('').reverse().join('');
  }
  return char;
}

// メイン生成関数
export function generateTrainingTexts(rows, charsPerRow, symmetryType, setCount = 100) {
  const texts = [];
  
  for (let i = 0; i < setCount; i++) {
    let baseText = generateText(rows, charsPerRow, symmetryType);
    let displayText = baseText;
    
    // 対称性タイプに応じて変換
    if (symmetryType === 'vertical') {
      displayText = makeVerticalSymmetry(baseText);
    } else if (symmetryType === 'horizontal') {
      displayText = makeHorizontalSymmetry(baseText);
    } else if (symmetryType === 'mixed') {
      displayText = makeMixed(baseText);
    }
    
    texts.push({
      id: i,
      original: baseText,
      display: displayText,
      type: symmetryType
    });
  }
  
  return texts;
}

// 対称性の判定（ユーザーの回答が正しいかどうか）
export function checkSymmetry(originalText, userAnswer, symmetryType) {
  const original = originalText.replace(/\n/g, '');
  const reversed = original.split('').reverse().join('');
  
  switch(symmetryType) {
    case 'vertical':
      return userAnswer === '上下対称' || userAnswer === 'vertical';
    case 'horizontal':
      return userAnswer === '鏡文字' || userAnswer === 'horizontal';
    case 'mixed':
      return userAnswer === 'ごちゃまぜ' || userAnswer === 'mixed';
    default:
      return false;
  }
}
