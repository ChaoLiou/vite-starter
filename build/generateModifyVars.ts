import { getThemeVariables } from 'ant-design-vue/dist/theme';

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    'primary-color': 'pink',
  };
}
