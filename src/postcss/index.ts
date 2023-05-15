/* eslint-disable @typescript-eslint/naming-convention */
import postcss, { Container, ChildNode } from 'postcss';

// root: 根节点，整个样式表是一个根节点。
// rule: 规则节点，表示一个 CSS 选择器和对应的一组声明块。
// atrule: At 规则节点，表示一个以 @ 开头的规则，如 @media、@import 等。
// decl: 声明节点，表示一个 CSS 属性和对应的值。
// comment: 注释节点，表示一个 CSS 注释内容。

function getSortNode(node: any) {
  if (node.type === 'rule' || node.type === 'atrule') { return node; }
  if (node.parent?.type === 'root' && node.parent?.raws.isRuleLike) { return node.parent; }
  if (node.parent?.document?.nodes?.some((item: { type: string; }) => item.type === 'root')) { return node.parent; }
  return node;
}

export const postcssSort = () => {
  return {
    postcssPlugin: 'postcss-sort-css',
    // 表示一个CSS文件并包含其所有解析的节点
    Root(root: Container) {
      // 遍历容器的后代节点，为每个节点调用回调
      root.walk((node: ChildNode) => {
        const sortNode = getSortNode(node);
        console.log(sortNode);
      });
    },
    Once(root: any, postcss: any) {
      const sort = (nodes: any) => {
        nodes.map((node: any) => {
          if (node.type === 'rule' || node.type === 'atrule') {
            node.nodes?.sort((a: any, b: any) => {
              if (a?.prop?.length < b?.prop?.length) { return -1; }
              if (a?.prop?.length > b?.prop?.length) { return 1; }
              return 0;
            });
          }
          if (node.nodes) { sort(node.nodes); }
        });
      };
      sort(root.nodes);
    },
    Declaration(decl: any, { Declaration }: any) {
      // decl.parent.nodes.sort(sortByPropName);
      // console.log('Declaration', decl);
    }
  };
};
