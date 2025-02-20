import type React from "react"
import Select from "react-select"
import { useController, type UseControllerProps } from "react-hook-form"

type OptionType = {
  label: string
  value: string
}

interface MultiSelectProps extends UseControllerProps {
  options: OptionType[]
  placeholder?: string
  isSearchable?: boolean
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  options,
  placeholder = "Select...",
  isSearchable = true,
  rules,
}) => {
  const {
    field: { onChange, onBlur, value = [] },
  } = useController({
    name,
    control,
    rules,
  })

  return (
    <div>
      <Select
        options={options}
        isMulti
        placeholder={placeholder}
        isSearchable={isSearchable}
        value={options.filter((option) => value.includes(option.value))} // Ensure correct selection
        onChange={(selectedOptions) => onChange(selectedOptions.map((opt) => opt.value))} // Store only `value` in form
        onBlur={onBlur}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  )
}
