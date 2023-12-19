import React, { useEffect} from 'react'
import './style.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export const LeaderTable = ({ rows, columns}) => {

  return (
    <div style={{ height: 500, margin: '0 120px'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ color: 'black', backgroundColor: 'white', fontWeight: '200', fontSize: '16px'}}
      />
    </div>
  )
}
