import React, { useState } from 'react';
import {
  Navbar,
  Card,
  Elevation,
  Button,
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
  const [position, setPosition] = useState([44, -121])
  const [zoom, setZoom] = useState(6)

  return (
    <div className="App">
      <Navbar>
        <Group>
          <Heading>Medimap-Lite</Heading>
          <Divider />
          <div className='nav-icon'>
            <a href="https://github.com/yevgenybulochnik">
              <img src={process.env.PUBLIC_URL + '/github.png'} alt="github" />
            </a>
          </div>
          <div className='nav-icon'>
            <a href="https://www.linkedin.com/in/yevgeny-eugene-bulochnik-b429a6155/">
              <img src={process.env.PUBLIC_URL + '/linkedin.png'} alt="linkedin" />
            </a>
          </div>
          <div className='nav-icon'>
            <a href="https://yevgenybulochnik.com">
              <img
                className='headshot'
                src='https://assets.yevgenybulochnik.com/headshot.jpeg'
                alt="home"
              />
            </a>
          </div>
        </Group>
      </Navbar>
      <div className='content'>
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
        <Card className='geomap-card' elevation={Elevation.TWO}>
          <GeoMap
            position={position}
            zoom={zoom}
            data={filteredData}
            locationData={location_data}
          />
        </Card>
        <Card elevation={Elevation.TWO}>
          <ChargeTable
            data={filteredData}
            height='300px'
            onRowClick={(e: any) => {
              const location = location_data.filter((loc: any) => loc.id === e.location_id)
              setZoom(15)
              setPosition(location[0].gps)
            }}
          />
        </Card>
      </div>
      <footer>
        <div className="icon-tray">
          <Button minimal>
            <a href="https://github.com/yevgenybulochnik">Github</a>
          </Button>
          <Button minimal>
            <a href="https://linkedin.com/in/yevgeny-eugene-bulochnik-b429a6155">
              LinkedIn
            </a>
          </Button>
          <Button minimal>
            <a href="https://yevgenybulochnik.com/contact">Contact</a>
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default App;
