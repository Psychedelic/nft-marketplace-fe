export const generateImgFromText = ({
  text,
  fontSize = 32,
  fontFamily = 'Helvetica, sans-serfi',
  bgColour = '#fc0',
  fgColour = '#00f',
}: {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  bgColour?: string;
  fgColour?: string;
}) => {
  if (!text) return;

  let el = document.createElement('canvas');

  const width = 500;

  el.setAttribute('id', text);

  let ctx = el.getContext('2d');

  ctx = el.getContext('2d');

  if (!ctx) return;

  el.width = width;
  el.height = width * 0.68;

  ctx.fillStyle = fgColour;
  ctx.font = `${fontSize}px ${fontFamily}`;

  const textSize = ctx.measureText(text);

  ctx.fillText(
    text,
    el.width / 2 - textSize.width / 2,
    el.height / 2 - fontSize / 2,
  );

  const container = document.createElement('canvas');
  container.width = el.width;
  container.height = el.height;
  const containerCtx = container.getContext('2d');

  if (!containerCtx) return;

  containerCtx.fillStyle = bgColour;
  containerCtx.fillRect(0, 0, el.width, el.height);

  containerCtx.drawImage(el, 0, 0);

  const base64 = container.toDataURL();

  return base64;
};

