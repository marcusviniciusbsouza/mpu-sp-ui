import React from "react";
import './Table.scss'
import organizeData from "../../utils/organizeDataForTable";

export interface TableDynamicsHeader {
    key: string
    value: string
    rigth?: boolean
}

declare interface TableProps { 
    header: TableDynamicsHeader[]
    data: any[]
    enableActions?: boolean
    onDelete?: (item : any) => void
    onDetail?: (item : any) => void
    onEdit?: (item : any) => void
}

const Table: React.FC<TableProps> = (props) => {
    const [organizedData, indexHeaders] = 
        organizeData(props.data, props.header)    
    return <><table className="TableDynamics">
    <thead>
      <tr>
        {
            props.header.map(header => 
                <th key={ header.key } className={header.rigth ? 'right' : ''}>
                    { header.value}
                </th>)
        }
      </tr>
    </thead>
    <tbody>
    {
        organizedData.map((row, i) => {
          return <tr key={i}>
            {
              Object
                .keys(row)
                .map((item, i) =>
                  item !== '$original'
                    ? <td
                        key={row.$original.id + i}
                        className={indexHeaders[item].rigth ? 'right' : ''}
                      >
                        { row[item] }
                      </td>
                    : null
                )
            }
          </tr>
        })
      }
    </tbody>
  </table></>
}

export default Table