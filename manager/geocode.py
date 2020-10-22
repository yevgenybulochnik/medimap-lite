import sys
import json
from pathlib import Path
import geocodio


def setup_geocodio_client(src=Path('.')):
    key_file = src / 'geocodio.key'
    if not key_file.exists():
        print('Geocodio auth key not found')
        sys.exit()

    key = key_file.read_text().strip()
    return geocodio.GeocodioClient(key)


def link_location_json(locations_data_file=Path('.') / 'geomap' / 'src' / 'data' / 'locations.json'):
    client = setup_geocodio_client()

    if not locations_data_file.exists():
        print(f'Location json not found at path {locations_data_file}')
        sys.exit()

    with locations_data_file.open('r') as data:
        location_data = json.load(data)

    try:
        for location in location_data:
            if 'gps' not in location.keys():
                loc = f'{location["street"]}, {location["city"]}, {location["state"]} {location["zip_code"]}'

                try:
                    results = client.geocode(loc)['results']
                except geocodio.exceptions.GeocodioAuthError:
                    print('An error has occured have you reached your limit?')
                    break

                if len(results) == 0:
                    print(f'Coords not found {loc}')
                    continue

                lat = results[0]['location']['lat']
                lng = results[0]['location']['lng']

                location['gps'] = [lat, lng]

                print(location)

        with locations_data_file.open('w') as f:
            json.dump(location_data, f)
    except (KeyboardInterrupt):
        with locations_data_file.open('w') as f:
            json.dump(location_data, f)
