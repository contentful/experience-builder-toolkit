import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { ItemSelector } from '../lib/get-item';
import { DropZone } from '../components/DropZone';
import { CompositionComponentNode } from '@contentful/experience-builder-core';

type WithPuckProps<Props> = Props & {
  id: string;
};

export type BaseField = {
  label?: string;
};

export type TextField = BaseField & {
  type: 'text' | 'number' | 'textarea';
};

export type SelectField = BaseField & {
  type: 'select' | 'radio';
  options: {
    label: string;
    value: string | number | boolean;
  }[];
};

export type ArrayField<Props extends { [key: string]: any } = { [key: string]: any }> =
  BaseField & {
    type: 'array';
    arrayFields: {
      [SubPropName in keyof Props[0]]: Field<Props[0][SubPropName]>;
    };
    defaultItemProps?: Props[0];
    getItemSummary?: (item: Props[0], index?: number) => string;
  };

// DEPRECATED
export type Adaptor<
  AdaptorParams = any,
  TableShape extends Record<string, any> = any,
  PropShape = TableShape,
> = {
  name: string;
  fetchList: (adaptorParams?: AdaptorParams) => Promise<TableShape[] | null>;
  mapProp?: (value: TableShape) => PropShape;
};

// DEPRECATED
export type ExternalFieldWithAdaptor<
  Props extends { [key: string]: any } = { [key: string]: any },
> = BaseField & {
  type: 'external';
  placeholder?: string;
  adaptor: Adaptor<any, any, Props>;
  adaptorParams?: object;
  getItemSummary: (item: Props, index?: number) => string;
};

export type ExternalField<Props extends { [key: string]: any } = { [key: string]: any }> =
  BaseField & {
    type: 'external';
    placeholder?: string;
    fetchList: () => Promise<any[] | null>;
    mapProp?: (value: any) => Props;
    getItemSummary: (item: Props, index?: number) => string;
  };

export type CustomField<Props extends { [key: string]: any } = { [key: string]: any }> =
  BaseField & {
    type: 'custom';
    render: (props: {
      field: CustomField;
      name: string;
      value: any;
      onChange: (value: Props) => void;
      readOnly?: boolean;
    }) => ReactElement;
  };

export type Field<Props extends { [key: string]: any } = { [key: string]: any }> =
  | TextField
  | SelectField
  | ArrayField<Props>
  | ExternalField<Props>
  | ExternalFieldWithAdaptor<Props>
  | CustomField;

export type DefaultRootProps = {
  title?: string;
  [key: string]: any;
};

export type DefaultComponentProps = { [key: string]: any; editMode?: boolean };

export type Fields<ComponentProps extends DefaultComponentProps = DefaultComponentProps> = {
  [PropName in keyof Omit<Required<ComponentProps>, 'children' | 'editMode'>]: Field<
    ComponentProps[PropName]
  >;
};

export type Content<Props extends { [key: string]: any } = { [key: string]: any }> =
  ComponentData[];

export type PuckComponent<Props extends DefaultComponentProps = DefaultComponentProps> = (
  props: WithPuckProps<Props & { puck: PuckContext }>
) => JSX.Element;

export type PuckContext = {
  renderDropZone: typeof DropZone;
};

export type ComponentConfig<
  ComponentProps extends DefaultComponentProps = DefaultComponentProps,
  DefaultProps = ComponentProps,
> = {
  id: string;
  render: PuckComponent<ComponentProps>;
  defaultProps?: DefaultProps;
};

type Category<ComponentName> = {
  components?: ComponentName[];
  title?: string;
  visible?: boolean;
  defaultExpanded?: boolean;
};

export type Config<
  Props extends { [key: string]: any } = { [key: string]: any },
  RootProps extends DefaultRootProps = DefaultRootProps,
  CategoryName extends string = string,
> = {
  categories?: Record<CategoryName, Category<keyof Props>> & {
    other?: Category<Props>;
  };
  components: {
    [ComponentName in keyof Props]: Omit<
      ComponentConfig<Props[ComponentName], Props[ComponentName]>,
      'type'
    >;
  };
  root?: Partial<
    ComponentConfig<
      RootProps & { children: ReactNode },
      Partial<RootProps & { children: ReactNode }>
    >
  >;
};

export type BaseData<Props extends { [key: string]: any } = { [key: string]: any }> = {
  readOnly?: Partial<Record<keyof Props, boolean>>;
};

export type ComponentData = CompositionComponentNode;

export type RootDataWithProps<Props extends DefaultRootProps = DefaultRootProps> = {
  props: Props;
};

// DEPRECATED
export type RootDataWithoutProps<Props extends DefaultRootProps = DefaultRootProps> = Props;

export type RootData<Props extends DefaultRootProps = DefaultRootProps> = BaseData<Props> &
  Partial<RootDataWithProps<Props>> &
  Partial<RootDataWithoutProps<Props>>; // DEPRECATED

type ComponentDataWithOptionalProps<Props extends { [key: string]: any } = { [key: string]: any }> =
  Omit<ComponentData, 'props'> & {
    props: Partial<WithPuckProps<Props>>;
  };

// Backwards compatability
export type MappedItem = ComponentData;

export type Data<
  Props extends DefaultComponentProps = DefaultComponentProps,
  RootProps extends DefaultRootProps = DefaultRootProps,
> = {
  root: RootData<RootProps>;
  children: CompositionComponentNode[];
  zones?: Record<string, Content<WithPuckProps<Props>>>;
};

export type ItemWithId = {
  _arrayId: string;
  data: any;
};

export type ArrayState = { items: ItemWithId[]; openId: string };

export type UiState = {
  leftSideBarVisible: boolean;
  itemSelector: ItemSelector | null;
  arrayState: Record<string, ArrayState | undefined>;
  componentList: Record<
    string,
    {
      components?: string[];
      title?: string;
      visible?: boolean;
      expanded?: boolean;
    }
  >;
};

export interface DropZone {
  direction: 'horizontal' | 'vertical';
}

export type DropZoneMap = Map<string, DropZone>;

export type AppState = { data: Data; ui: UiState; dropZones: DropZoneMap };