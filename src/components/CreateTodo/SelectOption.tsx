import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../../atoms";
import styled from "styled-components";

const SelectOption = () => {
  const [_, setSelectedCategory] = useRecoilState(categoryState);
  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value as Categories);
  };
  return (
    <form>
      <select onChange={onChange}>
        <option value={Categories.TODO}>TODO</option>
        <option value={Categories.DOIN}>DOIN</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
    </form>
  );
};
export default SelectOption;
