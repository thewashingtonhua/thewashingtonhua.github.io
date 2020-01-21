import { BlogNode } from '../../utils/interface';

export interface BlogCatelogViewProps {
  blogs: BlogNode[]
}

export enum BlogCatalogViewMode {
  normal = 'normal',
  archive = 'archive'
}
