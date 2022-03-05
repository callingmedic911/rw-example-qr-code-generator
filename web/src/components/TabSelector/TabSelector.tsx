import { classNames } from 'src/util'

const TabSelector = <Option extends string = string>({
  options,
  defaultValue,
  currentValue,
  onChange,
}: {
  options: Option[]
  defaultValue: Option
  currentValue: Option
  onChange: (type: Option) => void
}) => {
  return (
    <div>
      <div className="sm:hidden p-4">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value as Option)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {options.map((option, idx) => (
            <button
              key={option}
              data-testid={`tab-${option}`}
              onClick={() => onChange(option)}
              className={classNames(
                option === currentValue
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                idx === 0 && 'rounded-tl',
                idx === options.length - 1 && 'rounded-tr',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
              )}
              aria-current={option === currentValue ? 'page' : undefined}
            >
              <span>{option}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  option === currentValue ? 'bg-sky-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default TabSelector
