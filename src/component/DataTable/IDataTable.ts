type IDataTableTheme = 'default' | 'striped' | 'clean'
interface OptPreset {
  outline?: any;
  selection?: any;
  scrollbar?: any;
  frozenBorder?: any;
  area?: any;
  cell?: any;
  heightResizeHandle?: any;
  pagination?: any;
}

export interface IDataTheme {
  type: IDataTableTheme;
  preset?: OptPreset;
}
