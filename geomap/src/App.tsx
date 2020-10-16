import React from 'react';
import {
  Navbar,
  Card,
  Elevation,
} from '@blueprintjs/core'
import './App.scss';

import GeoMap from './components/map'
import HcpcsCodeSuggest from './components/hcpcsCodeSuggest'

const { Heading, Divider, Group } = Navbar

function App() {
  return (
    <div className="App">
      <Navbar>
        <Group>
          <Heading>Medimap-Lite</Heading>
          <Divider />
        </Group>
      </Navbar>
      <div className='content'>
        <Card elevation={Elevation.TWO}>
          <HcpcsCodeSuggest
            hcpcsCodeItems={[
              {id: '1', code: '12345', description: 'test hcpcs code'},
              {id: '2', code: '22345', description: 'test hcpcs code'},
              {id: '3', code: '32345', description: 'test hcpcs code'},
            ]}
            selectedhcpcsCodeItems={[]}
            onItemSelect={() => console.log('click')}
          />
        </Card>
        <Card className='geomap-card' elevation={Elevation.TWO}>
          <GeoMap />
        </Card>
      </div>
    </div>
  );
}

export default App;
