export function variationName(name, value) {
  const valuePortion =
    typeof value === 'number' ? String(value) : '' + value[0].toUpperCase() + value.substring(1)
  return '' + name + valuePortion
}
