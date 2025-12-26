interface DoodleProps {
  size: number;
}

export const Doodle = ({ size }: DoodleProps) => {
  return (
    <css-doodle>
      {`
          :doodle {
            @grid: 10x10;
            width: ${size}px;
            height: ${size}px;
          }

          background: @p(#000000, #333333, #666666, #999999, #cccccc, #ffffff);
          transform: scale(@r(.5, 1.2));
        `}
    </css-doodle>
  );
};
