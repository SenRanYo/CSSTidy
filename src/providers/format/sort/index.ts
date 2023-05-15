/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuidv4 } from 'uuid';
import postcss, { Container, Root, Node, Rule, ChildNode, AtRule, Comment, Declaration, PluginCreator } from 'postcss';

interface PluginOptions { }

const plugin: PluginCreator<PluginOptions> = (opts?: PluginOptions) => {
  return {
    Once(root) {
      root.walk((node: ChildNode) => {
        const comments: Record<string, ChildNode> = {};
        let childNodes: any[] = [];
        if (node.type === 'rule' || node.type === 'atrule') {
          node.each((childNode: ChildNode, index: number) => {
            const id = uuidv4();
            const node = { node: childNode, id, beforeComment: '', afterComment: '' };
            const prevNode = childNode.prev();
            const nextNode = childNode.next();
            // 前置注释
            if (prevNode && prevNode.type === 'comment' && prevNode.raws.before?.includes('\n')) {
              if (childNodes[index - 1]?.id) { node.beforeComment = childNodes[index - 1]?.id; }
            }
            if (childNode.type === 'comment') {
              if (childNode.raws.before?.includes('\n')) {
                if (childNodes[index - 1]?.id) { childNodes[index - 1].afterComment = id; }
              }
              if (!childNode.raws.before?.includes('\n')) {
                if (childNodes[index - 1]?.id) { childNodes[index - 1].afterComment = id; }
              }
              comments[id] = childNode;
            }
            childNodes.push(node);
          });

          childNodes.sort((a, b) => {
            if (a.node.prop?.length < b.node.prop?.length) { return -1; }
            if (a.node.prop?.length > b.node.prop?.length) { return 1; }
            else { return 0; };
          });

          Object.keys(comments).forEach(id => {
            const index = childNodes.findIndex(item => item.beforeComment === id || item.afterComment === id);
            if (childNodes[index]?.beforeComment === id) {
              childNodes.splice(index, 0, { node: comments[id] });
            }
            if (childNodes[index]?.afterComment === id) {
              childNodes.splice(index + 1, 0, { node: comments[id] });
            }
          });

          if (childNodes.length) {
            node.removeAll();
            node.append(childNodes.map(item => item.node));
          }
        }
      });
    },
    postcssPlugin: 'postcss-tidy',
  };
};

plugin.postcss = true;
export default plugin;