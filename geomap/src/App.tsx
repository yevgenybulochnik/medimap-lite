import React, { useState } from 'react';
import {
  Navbar,
  Card,
  Elevation,
} from '@blueprintjs/core'
import './App.scss';

import hcpcs_data from './data/hcpcs.json'
import charge_data from './data/charges.json'
import provider_data from './data/providers.json'
import location_data from './data/locations.json'

import GeoMap from './components/map'
import HcpcsCodeSuggest from './components/hcpcsCodeSuggest'
import ChargeTable from './components/chargeTable'

const { Heading, Divider, Group } = Navbar

function App() {

  const [filteredData, setFilteredData] = useState([])

  return (
    <div className="App">
      <Navbar>
        <Group>
          <Heading>Medimap-Lite</Heading>
          <Divider />
        </Group>
      </Navbar>
      <div className='content'>
        <Card className='geomap-card' elevation={Elevation.TWO}>
          <GeoMap
            data={filteredData}
            locationData={location_data}
          />
        </Card>
        <Card elevation={Elevation.TWO}>
          <HcpcsCodeSuggest
            hcpcsCodeItems={hcpcs_data}
            onItemSelect={(item: any) => {
              const data = charge_data.filter((datum: any) => datum.code === item.code)
              const mergedData = data.map((datum: any) => {
                const provider = provider_data.filter((d: any) => datum.npi === d.npi )
                return {...datum, ...provider[0]}
              })
              setFilteredData(mergedData as any)
            }}
          />
        </Card>
        <Card elevation={Elevation.TWO}>
          <ChargeTable
            data={filteredData}
            height='300px'
            onRowClick={() => console.log('test')}
          />
        </Card>
      </div>
    </div>
  );
}

export default App;
