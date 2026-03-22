interface Props {
  expression: 'neutral' | 'excited' | 'warm';
}

export default function PixelAvatar({ expression }: Props) {
  return (
    <div class={`avatar-sprite expr-${expression}`} aria-hidden="true">
      <div class="pixel-canvas" />
    </div>
  );
}
