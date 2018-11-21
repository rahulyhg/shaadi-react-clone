import React from 'react';
import Table from '../Common/Table';
import s from './styles';
import { headerElement } from './utils';

const breakLine = text => {
  const regex = /(<br \/>)/g;
  return text.split(regex).map((line, index) => (line.match(regex) ? <br key={Math.random()} /> : line));
};
const CompareTable = () => (
  <Table>
    <Table.Row>
      <Table.Column styleMixin={s.PrimaryHeaderMixin}>
        <s.FeatureBg>Features</s.FeatureBg>
      </Table.Column>
      <Table.Column styleMixin={s.DefaultHeaderMixin}>
        <s.HeadingPad>Free</s.HeadingPad>
      </Table.Column>
      <Table.Column styleMixin={s.DefaultHeaderMixin}>
        <s.HeadingPad>
          Gold,<br />Diamond
        </s.HeadingPad>
      </Table.Column>
      <Table.Column styleMixin={s.DefaultHeaderMixin}>
        <s.HeadingPad>Gold Plus</s.HeadingPad>
      </Table.Column>
      <Table.Column styleMixin={s.DefaultHeaderMixin}>
        <s.HeadingPad>
          Diamond Plus,<br />Platinum Plus
        </s.HeadingPad>
      </Table.Column>
    </Table.Row>
    {headerElement.map(row => (
      <Table.Row key={row.key}>
        {row.columns.map(
          (column, index) =>
            index === 0 ? (
              <Table.Column key={column.key} styleMixin={s.FirstRowMixin}>
                <s.FeaturePad>
                  {`${column.text} `}
                  {row.redAstric && <s.RedAstrick>*</s.RedAstrick>}
                </s.FeaturePad>
              </Table.Column>
            ) : (
              <Table.Column key={column.key} styleMixin={s.AlternateGreyColumnMixin}>
                {column.text ? breakLine(column.text) : (column.icon === 'cross' && <s.CrossIcon />) || <s.TickIcon />}
              </Table.Column>
            ),
        )}
      </Table.Row>
    ))}
  </Table>
);

export default CompareTable;
