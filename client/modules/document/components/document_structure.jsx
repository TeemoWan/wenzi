import React from 'react';
import classNames from 'classnames';

const DocumentStructure = React.createClass({
  render() {
    const {tree} = this.props;
    let trs =[];
    let addTr = function (nodes) {
      if (!nodes || nodes.length === 0) {
        return;
      }

      nodes.forEach(node => {
        trs.push(<tr key={node.id}>
          <td className={classNames('six', 'wide', {section: node.type === 'section'})}>
            <i className={classNames('icon', {
              folder: node.type === 'chapter',
              'file outline': node.type === 'section'})}/>
            <a href=''>{node.title}</a>
          </td>
          <td className='eight wide'>
            <a href=''>{node.lastCommitComment}</a>
          </td>
          <td className='two width right aligned'>
            {node.lastCommitAt}
          </td>
        </tr>);

        addTr(node.children);
      });
    };

    addTr(tree.children);

    return (
      <table className='ui selectable fixed single line striped table' id='doc-structure'>
        <tbody>
          {trs}
        </tbody>
      </table>
    );
  }
});

export default DocumentStructure;
