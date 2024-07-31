interface RadioButtonGroupProps<T> {
  options: T[];
  selectedOption: T;
  onChange: (option: T) => void;
  labelFormatter?: (option: T) => string;
}

const RadioButtonGroup = <T extends string | number>({ options = [], selectedOption, onChange, labelFormatter }: RadioButtonGroupProps<T>) => {
  return (
    <div className="flex gap-2 rounded-md shadow-sm" role="group">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          type="button"
          className={`align-middle font-semibold text-center transition-all text-xs py-1 px-2 rounded-lg border border-slate-800  hover:opacity-50 ${
            selectedOption === option ? 'text-white bg-slate-800 ' : 'text-slate-800 bg-white'
          }`}
        >
          {labelFormatter ? labelFormatter(option) : option.toString()}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
