import styles from './select.module.scss';

type CategoriesProps = {
  onChangeCategories: (value: string) => void;
};
let selectCategory = [
  'All goods',
  'Cartoon',
  'Chair',
  'Bed',
  'Table',
  'Drawer',
];

const Categories: React.FC<CategoriesProps> = ({ onChangeCategories }) => {
  return (
    <select
      name="category"
      className={'cart-header__category select--header ' + styles.root}
      onChange={(e) => onChangeCategories(e.target.value)}>
      {selectCategory.map((categoryName, i) => (
        <option
          value={categoryName}
          key={categoryName + i}
          label={categoryName}>
          {categoryName}
        </option>
      ))}
    </select>
  );
};

export default Categories;
