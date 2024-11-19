import React from "react";
import './Table.scss'
import organizeData from "../../utils/organizeDataForTable";
import Button from "../Button/Button";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from "../Grid/Grid";

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
                        key={row.$original.orgaoId + i}
                        className={indexHeaders[item].rigth ? 'right' : ''}
                      >
                        { row[item] }
                      </td>
                    : null
                )
            }
            {
              props.enableActions
                && <td className="actions right" >
                  <Grid columns={2} gap="5px">
                    {
                      props.onEdit &&
                      <Button 
                        onClick={() => props.onEdit && props.onEdit(row)} 
                        appendIcon={ <BorderColorRoundedIcon /> } 
                      />
                    }
                    {  
                      <Button
                          onClick={() => props.onActive && props.onActive(row)}
                          color={props.onActive && row.$original.active ? undefined : 'danger'}
                          appendIcon={props.onActive && row.$original.active ? <HttpsOutlinedIcon /> : <LockOpenIcon />}
                      />
                    }
                  </Grid>
                </td>
            }
          </tr>
        })
      }
    </tbody>
  </table></>
}

export default Table