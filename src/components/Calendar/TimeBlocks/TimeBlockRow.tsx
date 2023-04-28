import { Block } from "./Block";

export const TimeBlockRow: React.FC<{ current: Date; idxHr: number }> = ({
  idxHr,
  current,
}) => {
  return (
    <div className="flex h-20 flex-[calc(1/19)]">
      {new Array(7).fill(0).map((_, idxDay) => (
        <Block idxDay={idxDay} current={current} idxHr={idxHr} />
      ))}
    </div>
  );
};
