interface RadioButtonGroupProps<T> {
  options: T[];
  selectedOption: T;
  onChange: (option: T) => void;
  labelFormatter?: (option: T) => string;
}

const RadioButtonGroup = <T extends string | number>({ options = [], selectedOption, onChange, labelFormatter }: RadioButtonGroupProps<T>) => {
  return (
    <div className="flex gap-4 p-4">
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer">
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
            className="form-radio text-blue-500 h-4 w-4"
          />
          <span className="ml-2 text-gray-700">{labelFormatter ? labelFormatter(option) : option.toString()}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
