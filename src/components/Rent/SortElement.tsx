import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BlockLike } from "typescript";

interface SortElementProps {
  type: number;
  increasing: boolean;
  text: string;
  changeSort: (type: number) => void;
  highlight: boolean[];
}

const SortElement: React.FC<SortElementProps> = ({
  type,
  increasing,
  text,
  changeSort,
  highlight,
}) => {
  return (
    <div
      className={`sortElement flex cursor-pointer ${
        highlight[type] && "sortElement-highlight"
      }`}
      onClick={() => changeSort(type)}
    >
      {text}
      {increasing ? (
        <FiArrowUp className="mt-1 ml-2" />
      ) : (
        <FiArrowDown className="mt-1 ml-2" />
      )}
    </div>
  );
};

export default SortElement;
