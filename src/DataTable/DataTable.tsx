// eslint-disable-next-line no-unused-vars
import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import TuiGrid from 'tui-grid';
import Grid from "@toast-ui/react-grid";
import withMaxDiv from "../hoc/withMaxDiv";
import { DataTableWrapper } from "./DataTableStyles";
import toCapitalize from "../utils/toCapitalize";
import { Empty, Spin } from "antd";
import FlexCenter from "../FlexCenter";

TuiGrid.applyTheme("striped")
TuiGrid.setLanguage('ko')

interface IDataTableProps {
  rowHeaders?: any[]
	bounds?: any;
	data: any[];
	columns?: any[];
  loading?: boolean;
  exportOption?: any;
  onCheck?: (row: number[]) => void;
}

const DataTable: FunctionComponent<IDataTableProps> = (props) => {
  const { bounds, data, columns, loading = false, rowHeaders = ['rowNum'], exportOption, onCheck } = props;
  const { width, height } = bounds;

  const [select, setSelect] = useState<number[]>([])

  useEffect(() => {
    if (onCheck) {
      onCheck(select)
    }
  }, [select])
  

  const grid = useRef(null);

  const onSelect = useCallback((select?: number, selectAll?: boolean) => {
    if (selectAll) {
      setSelect(data.map((_, index: number) => index))
    } else if (select !== undefined) {
      setSelect((prev: number[]) => [...prev, select].sort());
    }
  }, [data])

  const onUnSelect = useCallback((select?: number, selectAll?: boolean) => {
    if (selectAll) {
      setSelect([])
    } else if (select !== undefined) {
      setSelect((prev: number[]) => prev.filter(v => v !== select));
    }
  }, [])
  

  const assignColumns = useMemo<any[]>(() => {
    console.log("columns", columns);
    if (columns) {
      return columns;
    } else if (data.length >= 1) {
      return Object.keys(data?.[0]).reduce((prev: any[], next: string) => {
        prev.push({ name: next, header: toCapitalize(next) });
        return prev;
      }, []);
    } else {
      return []
    }
  }, [columns, data]);

  useEffect(() => {
    console.log('data', data)
    console.log('assignColumns', assignColumns)
  }, [data, assignColumns])

  const isEmpty = data.length === 0;
  const isLoading = loading || (width === 0 && height === 0);

  const contextMenu = useCallback((() => {
    // @ts-ignore
    const gridInstantce = grid.current?.gridInst
    return ([
      [
        {
          name: 'export',
          label: '내보내기',
          subMenu: [
            {
              name: 'csvExport',
              label: 'CSV 내보내기',
              action: () => {
                gridInstantce.export('csv', exportOption);
              }
            },
            {
              name: 'excelExport',
              label: 'Excel 내보내기',
              action: () => {
                gridInstantce.export('xlsx', exportOption);
              }
            }
          ],
        }
      ],
    ]);
  }) as any, [exportOption])
  
    
  return (
    <DataTableWrapper style={{ width: "100%", height: "100%" }}>
      {isLoading ? (
        <FlexCenter style={{ width: '100%', height: '100%' }}>
          <Spin />
        </FlexCenter>
      ) : (
          <React.Fragment>
            {isEmpty ? (
              <Empty style={{ display: 'flex', flexFlow: 'column' }} />
            ) : (
              <Grid
                ref={grid}
                key={JSON.stringify({ width, height })}
                data={data}
                columns={assignColumns}
                rowHeight={25}
                width={width}
                bodyHeight={height - 42}
                heightResizable={false}
                columnOptions={{
                  resizable: true
                }}
                onCheck={((gridEvent: any) => {
                  const { rowKey } = gridEvent;
                  onSelect(rowKey)
                }) as any}
                onCheckAll={(() => {
                  onSelect(undefined, true)
                }) as any}
                onUncheck={((gridEvent: any) => {
                  const { rowKey } = gridEvent;
                  console.log('rowKey', rowKey)
                  onUnSelect(rowKey)
                }) as any}
                onUncheckAll={((gridEvent: any) => {
                  console.log('onUncheckAll', gridEvent)
                  onUnSelect(undefined, true)
                }) as any}
                rowHeaders={rowHeaders}
                contextMenu={contextMenu}
              />
            )}
        </React.Fragment>
      )}
		</DataTableWrapper>
  );
};

export default withMaxDiv(DataTable);
