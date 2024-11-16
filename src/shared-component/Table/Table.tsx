import React from "react";
import './Table.scss'
import organizeData from "../../utils/organizeDataForTable";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

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
    onEdit?: (item : any) => void
    onActive?: (item : any) => void
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
        {
          props.enableActions
            && <th className="right">Actions</th>
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
            {
              props.enableActions
                && <td className="actions right">
                  <div style={{ display: 'flex', maxWidth: '200px' }}>
                    {
                      props.onEdit &&
                      <Button 
                        onClick={() => props.onEdit && props.onEdit(row)} 
                        icon={ <BorderColorRoundedIcon /> } 
                      />
                    }
                    {
                      props.onActive &&
                        <Button
                          onClick={() => props.onActive && props.onActive(row)}
                        >
                          Detail
                        </Button>
                    }
                    {
                      props.onDelete &&
                        <Button
                          onClick={() => props.onDelete && props.onDelete(row)}
                        >
                          Delete
                        </Button>
                    }
                  </div>
                </td>
            }
          </tr>
        })
      }
    </tbody>
  </table></>
}

export default Table